function TranslationMenu() {

    const fadeInStyle = {
        animation: "fadeIn 2s ease-in"
    };

    const keyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;

    return (
        <>
            <style>{keyframes}</style>
            <div id="menu" style={fadeInStyle}>
                <p>A protocol droid will handle the translation.</p>
            </div>
        </>
    )
}

export default TranslationMenu