import { Button, Group, Modal, rem, Text } from "@mantine/core";
import { IconAlertCircleFilled } from "@tabler/icons-react";

type ModalConfigType = {
  onClose: (value: string) => void;
  title: string;
  description: string;
  yesText?: string;
  noText?: string;
};

type AttentionModalProps = {
  config: ModalConfigType;
  opened: boolean;
};

function AttentionModal(props: AttentionModalProps) {
  const modalTitle = (
    <Group gap="xs">
      <IconAlertCircleFilled size={30} style={{ color: "red" }} />
      <Text size={rem(17)}>{props.config.title}</Text>
    </Group>
  );
  return (
    <>
      <Modal
        opened={props.opened}
        onClose={() => props.config.onClose("cancel")}
        centered
        title={modalTitle}
      >
        <Text>{props.config.description}</Text>
        <Group justify="flex-end" mt="lg">
          <Button
            onClick={() => props.config.onClose("cancel")}
            autoFocus
            color="red"
          >
            {props.config.noText || "Cancel"}
          </Button>
          <Button onClick={() => props.config.onClose("ok")}>
            {props.config.yesText || "OK"}
          </Button>
        </Group>
      </Modal>
    </>
  );
}

export default AttentionModal;
export type { ModalConfigType };
