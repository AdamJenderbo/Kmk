using Kmk.Api.Domain.Users;

namespace Kmk.Api.Domain.Arrangements;

public class Arrangement
{
    public int SerialNumber { get; set; }
    public string Title { get; set; }
    public string Composer { get; set; }
    public string Arranger { get; set; }
    public DateTime Created { get; set; }
    public string CreatedBy { get; set; }
    public DateTime Changed { get; set; }
    public string ChangedBy { get; set; }
    public List<Part> Parts { get; set; }

    public Arrangement(int serialNumber, string title, string composer, string arranger)
    {
        if (serialNumber == 0)
            throw new CannotCreateArrangementException("Löpnummer får inte vara 0!");

        if (title is null || title.Length == 0)
            throw new CannotCreateArrangementException("Titel saknas!");

        SerialNumber = serialNumber;
        Title = title;
        Composer = composer;
        Arranger = arranger;
        Created = DateTime.Now;
        CreatedBy = string.Empty;
        Changed = DateTime.Now;
        ChangedBy = string.Empty;
        Parts = new List<Part>();
    }

    public void AddPart(Instrument instrument, int count)
    {
        if(Parts.Any(x => x.Instrument == instrument))
            return;

        Parts.Add(new Part(SerialNumber, instrument, count));
    }

    public void RemovePart(Instrument instrument) 
    {
        Part? part = Parts.SingleOrDefault(x => x.Instrument == instrument);

        if (part is null)
            return;

        Parts.Remove(part);
    }
}