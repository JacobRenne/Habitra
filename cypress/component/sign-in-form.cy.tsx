import { SignInForm } from "@/components/SignInForm";
import { supabase } from "@/lib/supabaseClient";
import {
  AppRouterContext,
  type AppRouterInstance,
} from "next/dist/shared/lib/app-router-context.shared-runtime";

// Create dummy router
const createRouter = (
  params: Partial<AppRouterInstance> = {},
): AppRouterInstance => ({
  back: cy.spy().as("routerBack"),
  forward: cy.spy().as("routerForward"),
  push: cy.spy().as("routerPush"),
  replace: cy.spy().as("routerReplace"),
  refresh: cy.spy().as("routerRefresh"),
  prefetch: cy.stub().resolves(),
  ...params,
});

describe("SignInForm component", () => {
  let signInStub: sinon.SinonStub;

  beforeEach(() => {
    signInStub = cy
      .stub(supabase.auth, "signInWithPassword")
      .resolves({ error: null });
  });

  afterEach(() => {
    signInStub.restore();
  });

  it("renders email and password inputs", () => {
    const router = createRouter();

    // Wrap the component in the Context Provider
    cy.mount(
      <AppRouterContext.Provider value={router}>
        <SignInForm />
      </AppRouterContext.Provider>,
    );

    cy.get("#signin-email").should("exist");
    cy.get("#signin-password").should("exist");
    cy.contains("Sign in").should("exist");
  });

  it("submits credentials and redirects on success", () => {
    const router = createRouter();

    cy.mount(
      <AppRouterContext.Provider value={router}>
        <SignInForm />
      </AppRouterContext.Provider>,
    );

    cy.get("#signin-email").type("test@example.com");
    cy.get("#signin-password").type("password123");
    cy.get('[data-testid="sign-in-button"]').click();

    // Check Supabase call
    cy.wrap(signInStub).should("have.been.calledWith", {
      email: "test@example.com",
      password: "password123",
    });

    // Check Router push was called
    cy.get("@routerPush").should("have.been.calledWith", "/");
  });

  it("shows error message when sign in fails", () => {
    const router = createRouter();

    signInStub.restore();
    signInStub = cy.stub(supabase.auth, "signInWithPassword").resolves({
      error: { message: "Invalid credentials" },
    });

    cy.mount(
      <AppRouterContext.Provider value={router}>
        <SignInForm />
      </AppRouterContext.Provider>,
    );

    cy.get("#signin-email").type("wrong@example.com");
    cy.get("#signin-password").type("wrongpassword");
    cy.get('[data-testid="sign-in-button"]').click();

    cy.contains("Invalid credentials").should("exist");

    // Ensure we did NOT navigate
    cy.get("@routerPush").should("not.have.been.called");
  });
});
