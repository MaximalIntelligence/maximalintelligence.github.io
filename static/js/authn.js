import { UserManager } from  'https://cdn.jsdelivr.net/npm/oidc-client-ts@3.4.1/+esm';

const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_wAVh49uzP",
    client_id: "hu97i74pmp4uh9lqvtsj302e1",
    redirect_uri: "http://localhost:4000/user",
    response_type: "code",
    scope: "phone openid email"
};

// create a UserManager instance
export const userManager = new UserManager({
    ...cognitoAuthConfig,
});

export async function signOutRedirect () {
    const clientId = "hu97i74pmp4uh9lqvtsj302e1";
    const logoutUri = "<logout_uri>";
    const cognitoDomain = "https://us-east-2wavh49uzp.auth.us-east-2.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
};