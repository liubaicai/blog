---
layout:     post
title:      "winform发送邮件"
date:       2013-07-04 15:18:18 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	&nbsp;</p>
<pre class="brush:csharp;first-line:1;pad-line-numbers:true;highlight:null;collapse:false;">
private bool SendMail()
        {
            bool strRe = false;
            SmtpClient client = new SmtpClient(txtStmp.Text, 25);
            client.UseDefaultCredentials = false;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.Credentials = new NetworkCredential(txtMailName.Text, txtSMTPPASS.Text);
            MailMessage SendMes = new MailMessage(new MailAddress(txtMailName.Text), new MailAddress(MailAdress.Text));
            SendMes.Subject = MailTitle.Text;      //邮件主题
            SendMes.SubjectEncoding = Encoding.UTF8;   //主题编码
            SendMes.Body = MailNote.Text.Replace("\r\n", "").Replace("\t", "");         //邮件正文
            SendMes.BodyEncoding = Encoding.UTF8;      //正文编码
            SendMes.IsBodyHtml = true;    //设置为HTML格式           
            SendMes.Priority = MailPriority.High;   //优先级

            try
            {
                client.Send(SendMes);
                strRe = true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return strRe;
        }
</pre>