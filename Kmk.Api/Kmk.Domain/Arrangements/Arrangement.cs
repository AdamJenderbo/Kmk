using Kmk.Domain.Arrangements.Exceptions;

namespace Kmk.Domain.Arrangements;

public class Arrangement
{
    /// <summary>
    /// Löpnummer
    /// </summary>
    public int SerialNumber { get; set; }

    /// <summary>
    /// Titel
    /// </summary>
    public string Title { get; set; }

    /// <summary>
    /// Kompositör
    /// </summary>
    public string Composer { get; set; }

    /// <summary>
    /// Arrangör
    /// </summary>
    public string Arranger { get; set; }

    /// <summary>
    /// Datum då arrangemanget skapats
    /// </summary>
    public DateTime Created { get; set; }

    /// <summary>
    /// Vem som skapat arrangemanet
    /// </summary>
    public string CreatedBy { get; set; }

    /// <summary>
    /// Datum då arrangemanget ändrats
    /// </summary>
    public DateTime Changed { get; set; }

    /// <summary>
    /// Vem som ändrat på arrangemanget
    /// </summary>
    public string ChangedBy { get; set; }

    /// <summary>
    /// Stämmor
    /// </summary>
    public List<ArrangementPart> Parts { get; set; }

    //public List<Tag> Tags { get; private set; }

    public ArrangementPart this[Instrument instrument]
    {
        get => Parts.Single(x => x.Instrument == instrument);
    }

    private Arrangement() { }

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

        Parts = new List<ArrangementPart>
        {
            new ArrangementPart(serialNumber, Instrument.Conductor),
            new ArrangementPart(serialNumber, Instrument.Flute),
            new ArrangementPart(serialNumber, Instrument.Oboe),
            new ArrangementPart(serialNumber, Instrument.Clarinet),
            new ArrangementPart(serialNumber, Instrument.Saxophone),
            new ArrangementPart(serialNumber, Instrument.FrenchHorn),
            new ArrangementPart(serialNumber, Instrument.Euphonium),
            new ArrangementPart(serialNumber, Instrument.Trombone),
            new ArrangementPart(serialNumber, Instrument.Trumpet),
            new ArrangementPart(serialNumber, Instrument.Tuba),
            new ArrangementPart(serialNumber, Instrument.Bass),
            new ArrangementPart(serialNumber, Instrument.Percussion)
        };

        //Tags = new List<Tag>();

        //RaiseEvent(new ArrangementCreatedEvent(this));
    }

    //public void AddTag(Tag tag)
    //{
    //    if (!Tags.Any(x => x.Id == tag.Id))
    //        return;

    //    Tags.Add(tag);
    //}

    //public void RemoveTag(Tag tag) 
    //{
    //    if (!Tags.Any(x => x.Id == tag.Id))
    //        return;

    //    Tags.Remove(tag); 
    //}
}