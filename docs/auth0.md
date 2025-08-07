# How to Use Auth0 (Development)

## Login / Logout

To enable authentication with Auth0 correctly during development, ensure the following settings are configured properly in the Auth0 dashboard under your application:

- **Allowed Callback URLs**  
- **Allowed Logout URLs**

These URLs must match your local development environment, and they may change depending on your local network configuration.

> **Tip:** The current redirect URL is logged in the `AuthProvider`. You can copy this URL and add it to both the Allowed Callback URLs and Allowed Logout URLs fields.  
> **Example:** `exp://192.168.1.196:8081`

---

<br>

## Webhook URL for New User Login

To enable webhook functionality for new user logins during development, your backend must be accessible via a public URL. This allows Auth0 to send requests to your backend for creating new users in the database.

Since your backend runs locally, you need to expose it to the internet using a tool like ngrok or a similar service. Refer to the backend documentation for detailed instructions on setting up the public endpoint.
