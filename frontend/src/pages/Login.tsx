import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { User, login } from "../api/auth";

const StyledLoginContainer = styled.div`
  height: 100vh;
  width: 100vw;
  align-items: center;
  background-color: var(--pale-background-color);
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0 18px;
  justify-content: center;
  position: relative;
`;

const StyledForm = styled.div`
  align-items: center;
  align-self: stretch;
  background-color: #fff;
  border: 0.2px solid;
  border-color: #000;
  border-radius: 5px;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 22px;
  justify-content: center;
  padding: 30px 25px;
  position: relative;
  width: 100%;
  margin: 0 auto;
  max-width: 400px;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.1);

  & form {
    align-items: center;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    gap: 22px;
    justify-content: center;
    position: relative;
    width: 100%;
  }

  & h2 {
    align-self: stretch;
    color: #000;
    font-size: 1.2rem;
    position: relative;
    margin: 10px 0 0;
  }

  & a {
    color: var(--link-color);
    position: relative;
    white-space: nowrap;
    width: fit-content;
  }
`;

const StyledInputBox = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 9px;
  position: relative;
  width: 100%;
`;

const StyledInput = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  flex: 0 0 auto;
  width: 100%;

  & label {
    align-self: stretch;
    color: #000;
    position: relative;
  }

  & input {
    align-self: stretch;
    background-color: #fff;
    border: 0.5px solid;
    border-color: #000;
    border-radius: 7px;
    height: 28px;
    position: relative;
    width: 100%;
    padding: 0 12px;
  }
`;

const StyledLoginButton = styled.button`
  align-items: center;
  background-color: var(--button-default-color);
  border-radius: 26px;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 10px;
  justify-content: center;
  padding: 8px 23px;
  position: relative;
  font-size: 1.2rem;
  color: #fff;
  white-space: nowrap;
`;

const StyledLinkButton = styled.button`
  background: none;
  border: none;
  box-shadow: none !important;
  color: inherit;
  cursor: pointer;
  padding: 0;
  font: inherit;

  &:hover {
    text-decoration: underline;
  }
`;

export const LoginPage = () => {
  const { handleSubmit, register, reset } = useForm<User>();
  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure();

  const onSubmit: SubmitHandler<User> = async (data) => {
    if (!data.loginId) {
      notifications.show({
        title: "ログインに失敗しました",
        message: "ログインIDを入力してください",
        color: "red",
      });
      return;
    }
    if (!data.password) {
      notifications.show({
        title: "ログインに失敗しました",
        message: "パスワードを入力してください",
        color: "red",
      });
      return;
    }
    const res = await login(data);
    if (res.status === 401) {
      notifications.show({
        title: "ログインに失敗しました",
        message: "ログインIDまたはパスワードが違います",
        color: "red",
      });
      reset({ password: "" });
      return;
    } else if (res.status !== 200) {
      notifications.show({
        title: `ログインに失敗しました (Code: ${res.status})`,
        message: "もう一度お試しください",
        status: "error",
      });
      reset({ password: "" });
      return;
    }
    navigate("/dashboard");
    notifications.show({
      message: "ログインしました！",
      status: "success",
    });
  };

  return (
    <StyledLoginContainer>
      <StyledForm>
        <h2>ATRS アトラス ログイン画面</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledInputBox>
            <StyledInput>
              <label htmlFor="loginId_register">ログインID</label>
              <input
                id="loginId_register"
                type="number"
                placeholder="Login ID"
                {...register("loginId")}
              />
            </StyledInput>
            <StyledInput>
              <label htmlFor="password_register">パスワード</label>
              <input
                id="password_register"
                type="password"
                placeholder="Password"
                {...register("password")}
              />
            </StyledInput>
          </StyledInputBox>
          <StyledLoginButton type="submit">ログイン</StyledLoginButton>
        </form>
        <StyledLinkButton onClick={open}>
          パスワードをお忘れの方
        </StyledLinkButton>
        <Modal opened={opened} onClose={close} title="パスワードをお忘れの方">
          <p>管理者にお問い合わせください。</p>
        </Modal>
      </StyledForm>
    </StyledLoginContainer>
  );
};
