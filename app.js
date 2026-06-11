(function () {
  const checkoutUrl = window.CODEX_AUDIT_KIT_CHECKOUT_URL || "";
  const issueUrl = window.CODEX_AUDIT_KIT_ISSUE_URL || "";
  const fallbackUrl = window.CODEX_AUDIT_KIT_FALLBACK_URL || "";
  const buttons = [
    document.getElementById("buyButton"),
    document.getElementById("buyButtonBottom"),
  ].filter(Boolean);
  const note = document.getElementById("checkoutNote");

  if (!checkoutUrl) {
    if (issueUrl) {
      buttons.forEach((button) => {
        button.href = issueUrl;
        button.textContent = "Request $5 checkout";
        button.setAttribute("target", "_blank");
        button.setAttribute("rel", "noopener noreferrer");
      });
      if (note) {
        const emailText = fallbackUrl
          ? " Email fallback is available through the project author address."
          : "";
        note.textContent =
          "Automated checkout is not configured yet. Request a checkout link through the public GitHub issue form; do not post secrets there." +
          emailText;
      }
      return;
    }

    if (fallbackUrl) {
      buttons.forEach((button) => {
        button.href = fallbackUrl;
        button.textContent = "Request $5 checkout";
      });
      if (note) {
        note.textContent =
          "Automated Stripe checkout is not configured yet. Use the email checkout request while the payment link is pending.";
      }
      return;
    }

    buttons.forEach((button) => {
      button.classList.add("is-disabled");
      button.setAttribute("aria-disabled", "true");
      button.textContent = "Checkout pending";
      button.href = "#buy";
    });
    if (note) {
      note.textContent =
        "Automated checkout is not configured in this local build.";
    }
    return;
  }

  buttons.forEach((button) => {
    button.href = checkoutUrl;
    button.textContent = "Buy for $5";
    button.setAttribute("target", "_blank");
    button.setAttribute("rel", "noopener noreferrer");
  });

  if (note) {
    note.textContent = "Secure checkout opens in a new tab.";
  }
})();
