import {
  ActivityHandler,
  MessageFactory,
  TurnContext,
  Activity,
} from "botbuilder";

export default class Bot extends ActivityHandler {
  constructor(public conversationReferences) {
    super();

    // Dependency injected dictionary for storing ConversationReference objects used in NotifyController to proactively message users
    this.conversationReferences = conversationReferences;

    this.onConversationUpdate(async (context, next) => {
      this.addConversationReference(context.activity);

      await next();
    });

    this.onMessage(async (context, next) => {
      this.addConversationReference(context.activity);

      const replyText = `Echo: ${context.activity.text}`;
      await context.sendActivity(MessageFactory.text(replyText, replyText));
      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      const welcomeText = `
      
      # CVE Alert Bot 🤖

      Welcome to the CVE Alert Bot!
      
      I'm here to keep you updated on the latest vulnerabilities
      and exposures in your sites.

      Happy securing!
      `;
      for (const member of membersAdded) {
        if (member.id !== context.activity.recipient.id) {
          await context.sendActivity(
            MessageFactory.text(welcomeText, welcomeText)
          );
        }
      }
      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });
  }

  addConversationReference(activity: Activity) {
    const conversationReference =
      TurnContext.getConversationReference(activity);

    this.conversationReferences[conversationReference.conversation.id] =
      conversationReference;
  }
}
