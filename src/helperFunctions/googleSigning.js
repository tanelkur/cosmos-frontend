import RenderGoogleSignout from "../components/RenderGoogleSignout";
import RenderGoogleLogin from "../components/RenderGoogleSignin";

export const googleSigning = (googleFirstName, googleLastName) => {
  return googleFirstName ? (
    <div className="container-small">
      <p className="ml">
        You are signed in as <b>{googleFirstName}</b> <b>{googleLastName}</b>
      </p>
      <RenderGoogleSignout />
    </div>
  ) : (
    <div className="container-small flex-center">
      <RenderGoogleLogin />
    </div>
  );
};
