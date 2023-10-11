namespace API.DTOs.Account
{
    public class FacebookResultDto
    {
        public FacebookData Data { get; set; }


    }

    public class FacebookData
    {
        public bool Is_valid { get; set; }
        public string User_Id { get; set; }

    }
}
