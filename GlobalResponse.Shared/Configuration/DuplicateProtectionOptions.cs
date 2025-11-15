namespace GlobalResponse.Shared;

public class DuplicateProtectionOptions
{
    public int TimeToLiveSeconds { get; set; }
    public Dictionary<string, string> Messages { get; set; } = new();
}

