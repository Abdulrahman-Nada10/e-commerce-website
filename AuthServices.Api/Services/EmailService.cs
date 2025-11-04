
using AuthServices.Api.Models;
using MailKit.Net.Smtp;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using MimeKit;
using System.Threading.Tasks;
namespace AuthServices.Api.Services
{
    public class EmailService
    {
        private readonly EmailSettings _settings;
         public EmailService (EmailSettings settings)
        {
            _settings=settings;
        }
        public async Task SendEmailAsync(string email, string subject, string body)
        {
            var Email = new MimeMessage();
            Email.From.Add(MailboxAddress.Parse(_settings.Email));
            Email.To.Add(MailboxAddress.Parse(email));
            Email.Subject = subject;
            var builder = new BodyBuilder { HtmlBody = body };
            Email.Body=builder.ToMessageBody();
            using  var smtp=new SmtpClient();
            smtp.ConnectAsync(_settings.SmtpServer, _settings.Port,MailKit.Security.SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(_settings.Email, _settings.Password);
            await smtp.SendAsync(Email);
            await smtp.DisconnectAsync(true);
        }
       
    }
}
