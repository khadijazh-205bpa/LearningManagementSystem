interface NavbarProps {
    onLogout: () => void
}

function Navbar({ onLogout }: NavbarProps) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h1>Kurslar</h1>
            <button onClick={onLogout}>Çıxış</button>
        </div>
    )
}

export default Navbar