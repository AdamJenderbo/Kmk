import '../../style/card.scss';

import { connect } from 'react-redux';
import { getInstrumentName } from '../../actions/instrument,';
import { roleToString } from '../../actions/user';

const ProfileField = ({ label, value }) => {
    if (!value) return null;
    return (
        <div style={{ padding: "10px 0", borderBottom: "1px solid #f0f0f0", display: "flex", gap: 16 }}>
            <div style={{ width: 140, color: "#6b7280", fontSize: 14, flexShrink: 0 }}>{label}</div>
            <div style={{ color: "#111827", fontSize: 14 }}>{value}</div>
        </div>
    );
};

const ProfilePage = ({ user }) => {
    const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
    const instrument = getInstrumentName(user.instrument);
    const roles = user.roles && user.roles.length > 0
        ? user.roles.map(r => roleToString(r)).filter(Boolean).join(", ")
        : null;

    return (
        <div className="page" style={{ maxWidth: 600, margin: "40px auto", padding: "0 16px" }}>
            <h2 style={{ marginBottom: 24 }}>Min profil</h2>
            <div className="card" style={{ padding: "8px 20px" }}>
                <ProfileField label="Namn" value={fullName} />
                <ProfileField label="E-post" value={user.email} />
                <ProfileField label="Telefonnummer" value={user.phoneNumber} />
                <ProfileField label="Adress" value={user.address} />
                <ProfileField label="Instrument" value={instrument} />
                <ProfileField label="Födelsedag" value={user.dateOfBirth} />
                <ProfileField label="Roller" value={roles} />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.user.user
});

export default connect(mapStateToProps)(ProfilePage);
