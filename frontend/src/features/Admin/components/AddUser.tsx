import {
  Button,
  Container,
  Group,
  Modal,
  rem,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconUserPlus } from "@tabler/icons-react";
import { signup } from "../../../api/auth";

function AddUser() {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      login_id: "",
      name: "",
    },

    validate: {
      login_id: (val) =>
        val.length === 4 ? null : "LoginIDは4文字である必要があります",
    },
  });

  const iconStyle = { width: rem(20), height: rem(20) };

  const handleSubmit = form.onSubmit(async (values) => {
    const signupReq = {
      loginId: values.login_id,
      name: values.name,
      organizationId: sessionStorage.getItem("organizationId") as string,
    };
    const res = await signup(signupReq);
    if (res.status === 400) {
      notifications.show({
        title: "Failed to add user",
        message: res.data,
        color: "red",
      });
      return;
    }
    if (res.status !== 200) {
      notifications.show({
        title: `Failed to add user (Code: ${res.status})`,
        message: "Please try again",
        color: "red",
      });
      return;
    }
    notifications.show({
      message: "User added successfully",
      color: "green",
    });
    form.reset();
    close();
  });

  return (
    <>
      <Button
        color="blue"
        variant="outline"
        leftSection={<IconUserPlus style={iconStyle} />}
        onClick={open}
      >
        Add User
      </Button>

      <Modal opened={opened} onClose={close} title="Add User" centered>
        <Container>
          <form onSubmit={handleSubmit}>
            <Stack>
              <TextInput
                required
                label="Login ID"
                type="number"
                placeholder="* * * *"
                value={form.values.login_id}
                onChange={(event) =>
                  form.setFieldValue("login_id", event.currentTarget.value)
                }
                error={form.errors.login_id && "Invalid LoginID"}
                radius="md"
              />
              <TextInput
                required
                label="Name"
                placeholder="Name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                radius="md"
              />
            </Stack>
            <Group justify="flex-end" gap="lg" mt="lg">
              <Button
                onClick={() => {
                  form.reset();
                  close();
                }}
                color="gray"
              >
                Cancel
              </Button>
              <Button type="submit" color="blue">
                Submit
              </Button>
            </Group>
          </form>
        </Container>
      </Modal>
    </>
  );
}

export default AddUser;
