import React from "react";

function Footer() {
  return (
    <div className="footer">
      <footer class="py-3" style={{backgroundColor: "#bf3f3e"}}>
        <div class="container">
          <p class="m-0 text-center text-white">
            <a href="https://github.com/thirteensuits/TheMala_v0.1/" target="_blank" rel="noreferrer" style={{color: "white", textDecoration: "underline"}}>
            GitHub
            </a>
            &nbsp;|&nbsp;
            <a href="https://twitter.com/TheMala_xyz" target="_blank" rel="noreferrer" style={{color: "white", textDecoration: "underline"}}>
            Twitter
            </a>
            &nbsp;|&nbsp;
            <a href="https://www.themugle.tw" target="_blank" rel="noreferrer" style={{color: "white", textDecoration: "underline"}}>
            Parent Brand
            </a>
          <br></br>
            Copyright &copy; Algebra 2022
          </p>
        </div>
      </footer>
    </div>

  );
}

export default Footer;
