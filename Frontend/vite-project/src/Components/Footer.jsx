function Footer() {
  return (
    <div>
      <p
        className="navbar-brand"
        style={{
          color: "red",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        Copyright &copy; 2024{" "}
        <span style={{ color: "green" }}>Blogger.com</span> . All Rights
        Reserved.
      </p>
    </div>
  );
}

export default Footer;
