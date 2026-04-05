namespace Kmk.Domain.Arrangements;

public class ArrangementPart
{
    public int ArrangementSerialNumber { get; set; }
    public Instrument Instrument { get; private set; }
    public string FileId { get; set; } = string.Empty;

    public ArrangementPart(int arrangementSerialNumber, Instrument instrument)
    {
        ArrangementSerialNumber = arrangementSerialNumber;
        Instrument = instrument;
    }
}