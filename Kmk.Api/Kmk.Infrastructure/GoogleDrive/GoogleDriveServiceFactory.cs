using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;

namespace Kmk.Infrastructure.GoogleDrive;

public class GoogleDriveServiceFactory
{
    public static DriveService CreateService()
    {
        GoogleCredential credential;

        using (var stream = new FileStream(
            "", 
            FileMode.Open, 
            FileAccess.Read))
        {
            credential = GoogleCredential.FromStream(stream)
                .CreateScoped(DriveService.Scope.Drive);
        }

        return new DriveService(new BaseClientService.Initializer()
        {
            HttpClientInitializer = credential,
            ApplicationName = "My Drive Service App"
        });
    }
}
