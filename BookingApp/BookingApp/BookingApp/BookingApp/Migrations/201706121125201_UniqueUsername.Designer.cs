// <auto-generated />
namespace BookingApp.Migrations
{
    using System.CodeDom.Compiler;
    using System.Data.Entity.Migrations;
    using System.Data.Entity.Migrations.Infrastructure;
    using System.Resources;
    
    [GeneratedCode("EntityFramework.Migrations", "6.1.3-40302")]
    public sealed partial class UniqueUsername : IMigrationMetadata
    {
        private readonly ResourceManager Resources = new ResourceManager(typeof(UniqueUsername));
        
        string IMigrationMetadata.Id
        {
            get { return "201706121125201_UniqueUsername"; }
        }
        
        string IMigrationMetadata.Source
        {
            get { return null; }
        }
        
        string IMigrationMetadata.Target
        {
            get { return Resources.GetString("Target"); }
        }
    }
}