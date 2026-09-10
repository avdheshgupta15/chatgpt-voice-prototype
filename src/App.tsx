import { useState } from "react";
import { db } from "./model/db";
import { REANSWER_LIST, SCRIPT } from "./model/seed";
import {
  HomeScreen,
  MeetNewVoiceScreen,
  MicPermissionModal,
} from "./screens/Home";
import { SessionScreen } from "./screens/Session";
import { EditMessageScreen, TranscriptScreen } from "./screens/Transcript";
import {
  ChooseVoiceScreen,
  MeetVoiceScreen,
  SecurityControlScreen,
  WakeWaitScreen,
} from "./screens/Wizard";
import { DemoSheet } from "./ui/DemoSheet";
import { useDb } from "./ui/hooks";

type WizardStep = "meet" | "choose" | "wakewait" | "security";

type Route =
  | { name: "home" }
  | { name: "meetNewVoice" }
  | { name: "wizard"; step: WizardStep }
  | { name: "session"; conversationId: string }
  | { name: "transcript"; conversationId: string }
  | { name: "edit"; conversationId: string; messageId: string };

export default function App() {
  useDb();
  const [route, setRoute] = useState<Route>({ name: "home" });
  const [permModal, setPermModal] = useState(false);
  const [sheet, setSheet] = useState(false);

  const user = db.user();

  const startSession = (trigger: "tap_icon" | "wake_word") => {
    const conv = db.startConversation(trigger);
    setRoute({ name: "session", conversationId: conv.id });
  };

  const voiceTap = () => {
    if (!user.micPermissionGranted) {
      setPermModal(true);
      return;
    }
    if (user.voiceSetupCompletedAt) startSession("tap_icon");
    else setRoute({ name: "meetNewVoice" });
  };

  const beginSetup = () => {
    if (!db.user().voiceSetupStartedAt)
      db.updateUser({ voiceSetupStartedAt: new Date().toISOString() });
    setRoute({ name: "wizard", step: "meet" });
  };

  const homeTyped = (text: string) => {
    const conv = db.startConversation("tap_icon");
    db.addMessage({
      conversationId: conv.id,
      role: "user",
      content: text,
      inputMode: "typed",
      isEdited: false,
      reportedBadTranscription: false,
    });
    setRoute({ name: "session", conversationId: conv.id });
  };

  const sendEdit = (conversationId: string, messageId: string, text: string) => {
    db.updateMessage(messageId, { content: text, isEdited: true });
    db.truncateAfter(messageId);
    db.addMessage({
      conversationId,
      role: "assistant",
      content: /manga/i.test(text) ? REANSWER_LIST : SCRIPT[1].assistant,
      inputMode: "voice",
      isEdited: false,
      reportedBadTranscription: false,
    });
    setRoute({ name: "transcript", conversationId });
  };

  let screen: React.ReactNode;
  switch (route.name) {
    case "home":
      screen = (
        <HomeScreen
          onVoice={voiceTap}
          onSendTyped={homeTyped}
          onMenu={() => setSheet(true)}
        />
      );
      break;
    case "meetNewVoice":
      screen = (
        <MeetNewVoiceScreen onStart={beginSetup} onMenu={() => setSheet(true)} />
      );
      break;
    case "wizard":
      if (route.step === "meet")
        screen = (
          <MeetVoiceScreen
            onContinue={() => setRoute({ name: "wizard", step: "choose" })}
            onClose={() => setRoute({ name: "home" })}
          />
        );
      else if (route.step === "choose")
        screen = (
          <ChooseVoiceScreen
            voices={db.snapshot().voices}
            onContinue={(voiceId) => {
              db.updateUser({ selectedVoiceId: voiceId });
              setRoute({ name: "wizard", step: "wakewait" });
            }}
            onClose={() => setRoute({ name: "home" })}
          />
        );
      else if (route.step === "wakewait")
        screen = (
          <WakeWaitScreen
            onContinue={() => setRoute({ name: "wizard", step: "security" })}
            onClose={() => setRoute({ name: "home" })}
          />
        );
      else
        screen = (
          <SecurityControlScreen
            onFinish={(optOut) => {
              db.updateUser({
                dataTrainingOptOut: optOut,
                voiceSetupCompletedAt: new Date().toISOString(),
              });
              startSession("tap_icon");
            }}
            onClose={() => setRoute({ name: "home" })}
          />
        );
      break;
    case "session":
      screen = (
        <SessionScreen
          conversationId={route.conversationId}
          userName={user.name}
          onEnd={() =>
            setRoute({ name: "transcript", conversationId: route.conversationId })
          }
          onMenu={() => setSheet(true)}
        />
      );
      break;
    case "transcript":
      screen = (
        <TranscriptScreen
          conversationId={route.conversationId}
          onEdit={(messageId) =>
            setRoute({
              name: "edit",
              conversationId: route.conversationId,
              messageId,
            })
          }
          onNewSession={() => startSession("tap_icon")}
          onMenu={() => setSheet(true)}
        />
      );
      break;
    case "edit": {
      const msg = db
        .snapshot()
        .messages.find((m) => m.id === route.messageId);
      screen = msg ? (
        <EditMessageScreen
          initial={msg.content}
          onCancel={() =>
            setRoute({ name: "transcript", conversationId: route.conversationId })
          }
          onSend={(text) => sendEdit(route.conversationId, route.messageId, text)}
        />
      ) : null;
      break;
    }
  }

  return (
    <div className="flex h-full justify-center bg-black">
      <div className="relative h-full w-full max-w-[430px] overflow-hidden bg-surface">
        {screen}
        {permModal && route.name === "home" && (
          <MicPermissionModal
            onAllow={() => {
              db.updateUser({ micPermissionGranted: true });
              setPermModal(false);
              if (db.user().voiceSetupCompletedAt) startSession("tap_icon");
              else setRoute({ name: "meetNewVoice" });
            }}
            onDeny={() => {
              db.updateUser({ micPermissionGranted: false });
              setPermModal(false);
            }}
          />
        )}
        {sheet && (
          <DemoSheet
            onClose={() => setSheet(false)}
            onWakeStart={() => {
              setSheet(false);
              startSession("wake_word");
            }}
            onMissedWake={() => db.recordMissedWakeWord()}
            onReset={() => {
              db.reset();
              setSheet(false);
              setRoute({ name: "home" });
            }}
          />
        )}
      </div>
    </div>
  );
}
