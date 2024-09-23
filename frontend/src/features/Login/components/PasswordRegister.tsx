import {
  Button,
  Container,
  Group,
  Modal,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { signupUnregistered } from "../../../api/auth";
import { StyledLinkButton } from "../../../pages/Login";

function PasswordRegister() {
  const [opened, { open, close }] = useDisclosure();

  const form = useForm({
    initialValues: {
      loginId: "",
      name: "",
      password: "",
    },

    validate: {
      loginId: (val) =>
        val.length === 4 ? null : "LoginIDは4文字である必要があります",
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    const res = await signupUnregistered(values);
    console.log(res);
    if (res.status === 400) {
      if (res.data === "User not found") {
        notifications.show({
          title: "ユーザーが見つかりませんでした",
          message: "User not found (Code: 400)",
          color: "red",
        });
        form.reset();
        return;
      } else {
        notifications.show({
          title: "予期せぬエラーが発生しました",
          message: res.data + " (Code: 400)",
          color: "red",
        });
        form.reset();
        return;
      }
    }
    if (res.status === 401) {
      if (res.data === "The user is already registered") {
        notifications.show({
          title: "ユーザーは既に登録されています。",
          message: "ログイン画面からログインしてください。 (Code: 401)",
          color: "red",
        });
        form.reset();
        close();
        return;
      } else if (res.data === "Invalid user name") {
        notifications.show({
          title: "ユーザー名が違います",
          message: "Invalid user name (Code: 401)",
          color: "red",
        });
        form.reset();
        return;
      } else {
        notifications.show({
          title: "予期せぬエラーが発生しました",
          message: res.data + " (Code: 401)",
          color: "red",
        });
        return;
      }
    }
    if (res.status !== 200) {
      notifications.show({
        title: `予期せぬエラーが発生しました`,
        message: res.data + ` (Code: ${res.status})`,
        color: "red",
      });
      form.reset();
      return;
    }

    notifications.show({
      title: "ユーザー登録が完了しました",
      message: "ログイン画面からログインしてください。",
      color: "blue",
    });
    form.reset();
    close();
  });

  return (
    <>
      <StyledLinkButton onClick={open}>
        パスワードが未設定の方はこちら
      </StyledLinkButton>
      <Modal opened={opened} onClose={close} title="パスワード登録 (初期設定)">
        <Container>
          <form onSubmit={handleSubmit}>
            <Stack>
              <TextInput
                required
                label="Login ID"
                type="number"
                placeholder="* * * *"
                value={form.values.loginId}
                onChange={(event) =>
                  form.setFieldValue("loginId", event.currentTarget.value)
                }
                error={form.errors.loginId && "Invalid LoginID"}
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
                error={form.errors.name && "Invalid Name"}
                radius="md"
              />
              <PasswordInput
                required
                label="Password"
                placeholder="Password"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                error={form.errors.password && "Invalid Password"}
                radius="md"
              />
            </Stack>
            <Group justify="flex-end" mt="lg">
              <Button type="submit" color="blue">
                Register
              </Button>
            </Group>
          </form>
        </Container>
      </Modal>
    </>
  );
}

export default PasswordRegister;
