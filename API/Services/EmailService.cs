using API.DTOs.Account;
using Mailjet.Client;
using Mailjet.Client.TransactionalEmails;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace API.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<bool> SendEmailAsync(EmailSendDto emailsend)
        {
            MailjetClient client = new MailjetClient(_configuration["MailJet:ApiKey"], _configuration["MailJet:SecretKey"]);

            var email = new TransactionalEmailBuilder()
                .WithFrom(new SendContact(_configuration["Email:From"], _configuration["Email:ApplicationName"]))
                .WithSubject(emailsend.Subject)
                .WithHtmlPart(emailsend.Body)
                .WithTo(new SendContact(emailsend.To))
                .Build();


            var response= await client.SendTransactionalEmailAsync(email);

            if (response.Messages != null)
            {
                if (response.Messages[0].Status == "success")
                {
                    return true;
                }
            }

           
           return false;
            


        }
    }
}
