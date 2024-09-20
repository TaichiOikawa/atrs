import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
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
  const { handleSubmit, register } = useForm<User>();
  const navigate = useNavigate();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const onSubmit: SubmitHandler<User> = async (data) => {
    if (!data.loginId) {
      toast({
        title: "ログインIDを入力してください",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!data.password) {
      toast({
        title: "パスワードを入力してください",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const res = await login(data);
    if (res.status === 401) {
      toast({
        title: "ログインIDまたはパスワードが間違っています",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    } else if (res.status !== 200) {
      toast({
        title: "ログインに失敗しました (サーバーエラー)",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    navigate("/dashboard");
    toast({
      title: `ログインしました`,
      status: "success",
      duration: 3000,
      isClosable: true,
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
        <StyledLinkButton onClick={onOpen}>
          パスワードをお忘れの方
        </StyledLinkButton>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader>パスワードをお忘れの方</AlertDialogHeader>

              <AlertDialogBody>
                お手数ですが、管理者にお問い合わせください。
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Close
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </StyledForm>
    </StyledLoginContainer>
  );
};
