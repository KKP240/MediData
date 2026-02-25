function Footer() {
  return (
    <footer style={{
      background: 'white',
      textAlign: 'center',
      padding: '40px',
      marginTop: '60px',
      borderTop: '1px solid #eee'
    }}>
      <p>© 2026 MediData - ข้อมูลเพื่อการศึกษาเบื้องต้นเท่านั้น</p>
      <p style={{ color: '#e74c3c', fontSize: '0.8rem' }}>
        *ควรปรึกษาแพทย์หรือเภสัชกรทุกครั้งก่อนใช้ยา
      </p>
    </footer>
  );
}

export default Footer;