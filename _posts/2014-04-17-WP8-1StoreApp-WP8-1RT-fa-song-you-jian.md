---
layout:     post
title:      "WP8.1StoreApp(WP8.1RT)---发送邮件和短信"
date:       2014-04-17 10:37:15 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	在WP7/8中，发送短信是利用了&lt;span style="line-height: 1.6em;">EmailComposeTask和&lt;/span>SmsComposeTask来实现的。
</p>

<p>
	在WP8.1 Store App中，原来的方式已经失效，采用了新的方法：ChatMessageManager和EmailManager管理和发送信息。
</p>

<p>
	简单使用：
</p>

<pre class="brush:csharp;">
        private async void SendSmsTask(string body,string phoneNum)
        {
            var chatMessage = new Windows.ApplicationModel.Chat.ChatMessage();
            chatMessage.Body = body;
            chatMessage.Recipients.Add(phoneNum);
            await ChatMessageManager.ShowComposeSmsMessageAsync(chatMessage);
        }
        private async void SendEmailTask(string body, string emailAddress)
        {
            var emailMessage = new EmailMessage();
            emailMessage.Body = body;
            emailMessage.To.Add(new EmailRecipient(emailAddress));
            await EmailManager.ShowComposeNewEmailAsync(emailMessage);
        }</pre>

<p>
	msdn的介绍:
</p>

<pre class="brush:csharp;">
        private async void ComposeSms(Windows.ApplicationModel.Contacts.Contact recipient,string messageBody,StorageFile attachmentFile,string mimeType)
        {
            var chatMessage = new Windows.ApplicationModel.Chat.ChatMessage();
            chatMessage.Body = messageBody;

            if (attachmentFile != null)
            {
                var stream = Windows.Storage.Streams.RandomAccessStreamReference.CreateFromFile(attachmentFile);

                var attachment = new Windows.ApplicationModel.Chat.ChatMessageAttachment(
                    mimeType,
                    stream);

                chatMessage.Attachments.Add(attachment);
            }

            var phone = recipient.Phones.FirstOrDefault&lt;Windows.ApplicationModel.Contacts.ContactPhone&gt;();
            if (phone != null)
            {
                chatMessage.Recipients.Add(phone.Number);
            }
            await Windows.ApplicationModel.Chat.ChatMessageManager.ShowComposeSmsMessageAsync(chatMessage);
        }

        private async void ComposeEmail(Windows.ApplicationModel.Contacts.Contact recipient,string messageBody,StorageFile attachmentFile)
        {
            var emailMessage = new Windows.ApplicationModel.Email.EmailMessage();
            emailMessage.Body = messageBody;

            if (attachmentFile != null)
            {
                var stream = Windows.Storage.Streams.RandomAccessStreamReference.CreateFromFile(attachmentFile);

                var attachment = new Windows.ApplicationModel.Email.EmailAttachment(
                    attachmentFile.Name,
                    stream);

                emailMessage.Attachments.Add(attachment);
            }

            var email = recipient.Emails.FirstOrDefault&lt;Windows.ApplicationModel.Contacts.ContactEmail&gt;();
            if (email != null)
            {
                var emailRecipient = new Windows.ApplicationModel.Email.EmailRecipient(email.Address);
                emailMessage.To.Add(emailRecipient);
            }

            await Windows.ApplicationModel.Email.EmailManager.ShowComposeNewEmailAsync(emailMessage);

        }</pre>

<p>
	&nbsp;
</p>