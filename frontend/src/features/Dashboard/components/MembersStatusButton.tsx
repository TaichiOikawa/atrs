import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { organizationStatus } from "../../../api/activity";
import { organizationStatusType, StatusEnum } from "../../../types/status";
import MemberStatusModal from "./MemberStatusModal";

const StyledMemberStatusButton = styled.button`
  align-items: center;
  background-color: var(--status-color);
  border-radius: 18px;
  display: flex;
  gap: 0;
  justify-content: flex-end;
  overflow: hidden;
  padding: 10px 15px;
  position: relative;
  width: 100%;

  & .frame {
    align-items: center;
    display: flex;
    flex: 1;
    flex-grow: 1;
    gap: 8px;
    justify-content: center;
    position: relative;
  }

  & .people-fill {
    height: 35px;
    width: 35px;
    position: relative;
  }

  & div {
    align-items: flex-end;
    display: inline-flex;
    flex: 0 0 auto;
    gap: 5px;
    justify-content: center;
    position: relative;
  }

  & h4 {
    margin-top: -1px;
    white-space: nowrap;
    width: fit-content;
  }

  & p {
    font-size: 1rem;
    position: relative;
    white-space: nowrap;
    width: fit-content;
  }

  & .arrow-right {
    height: 30px;
    width: 30px;
    position: relative;
  }
`;

function MemberStatusButton(reload?: any) {
  const [memberStatus, setMemberStatus] =
    useState<organizationStatusType>(null);
  const [opened, { open, close }] = useDisclosure();
  useEffect(() => {
    (async () => {
      const res = await organizationStatus();
      setMemberStatus(res);
    })();
  }, [opened, reload]);

  const data = {
    numberOfUsers: memberStatus?.length || 0,
    numberOfActive:
      memberStatus?.filter((user) => user.status === StatusEnum.ACTIVE)
        .length ?? 0,
  };

  return (
    <>
      <StyledMemberStatusButton className="button-hover" onClick={open}>
        <div className="frame">
          <img
            src="/people-fill.svg"
            alt="Members Icon"
            className="people-fill"
          />
          <div>
            <h4>{data.numberOfActive}人オンライン</h4>
            <p>/{data.numberOfUsers}人</p>
          </div>
        </div>
        <img
          src="/arrow-right-short.svg"
          alt="Right Arrow"
          className="arrow-right"
        />
      </StyledMemberStatusButton>
      <Modal
        opened={opened}
        onClose={close}
        size="lg"
        title="オンラインメンバー"
      >
        <MemberStatusModal status={memberStatus} />
      </Modal>
    </>
  );
}

export default MemberStatusButton;
