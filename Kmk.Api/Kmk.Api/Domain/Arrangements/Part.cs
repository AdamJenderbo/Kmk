using Kmk.Api.Domain.Users;

namespace Kmk.Api.Domain.Arrangements;

public class Part
{
    public int ArrangementSerialNumber { get; set; }
    public Instrument Instrument { get; set; }
    public int Count { get; set; }

    public Part(int arrangementSerialNumber, Instrument instrument, int count)
    {
        if (count < 1)
            throw new Exception("Måste finnas minst en stämma per instrument!");

        ArrangementSerialNumber = arrangementSerialNumber;
        Instrument = instrument;
        Count = count;
    }
}
