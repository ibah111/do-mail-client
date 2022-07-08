import CustomButton from "./CustomButton";

export default function ChangerMode() {
  return (
    <>
      <CustomButton mode="IncomingMail">Входящая почта</CustomButton>
      <CustomButton mode="IncomingGovernmentMail">Госпочта</CustomButton>
      <CustomButton mode="IncomingCourtMail">
        Электронная почта(СУД)
      </CustomButton>
      <CustomButton mode="IncomingCourtBailiffMail">
        Электронная почта (ФССП)
      </CustomButton>
    </>
  );
}
