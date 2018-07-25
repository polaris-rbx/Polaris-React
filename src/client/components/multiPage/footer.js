import React from 'react';
import { Col, Container, Row, Footer } from 'mdb';

class FooterPage extends React.Component {
	render(){
		return(
			<Footer color="elegant-color-dark" className="font-small pt-4 mt-4">
				<Container className="text-left">
					<Row>
						<Col sm="6">
							<h5 className="title">Site info</h5>
							<p>This is the W.I.P Polaris site. Built with React and express.</p>
						</Col>
						<Col sm="6">
							<h5 className="title">Links</h5>
							<ul>
								<li className="list-unstyled"><a href="#!">Link 1</a></li>
								<li className="list-unstyled"><a href="#!">Link 2</a></li>
								<li className="list-unstyled"><a href="#!">Link 3</a></li>
								<li className="list-unstyled"><a href="#!">Link 4</a></li>
							</ul>
						</Col>
					</Row>
				</Container>
				<div className="footer-copyright text-center">
					<Container fluid>
                        &copy; {(new Date().getFullYear())} Copyright: <a href="mailto:josh@muir.xyz"> Josh Muir </a>
					</Container>
				</div>
			</Footer>
		);
	}
}

export default FooterPage;
