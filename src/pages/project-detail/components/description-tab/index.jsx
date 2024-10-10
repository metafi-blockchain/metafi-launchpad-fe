import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './index.scss';

const BFDescriptionTab = ({ data }) => {
	// console.log(data)
	return (
		<div className="bf-description ">
			<Row>
				<Col lg="3">
					<div className="bf-pool-information mt-4 d-none d-lg-block">
						<div className="bf-pool-information-inner">
							<div className="title">Sections</div>
							<div className="list">
								{data.articles.map(item => (
									<a href={'/projects/1#article' + item.id} key={item.id}>
										<div className="py-3">
											<strong>{item.title}</strong>
										</div>
									</a>
								))}
							</div>
						</div>
					</div>
				</Col>
				<Col lg="9">
					{data.articles.map((item, key) => (
						<div id={'article' + item.id} key={item.id}>
							<h3 className={`${key > 1 ? 'pt-5 mt-5' : 'pt-3'}`}>
								<strong>{item.title}</strong>
							</h3>
							<div dangerouslySetInnerHTML={{ __html: item.text }}></div>
						</div>
					))}
				</Col>
			</Row>
		</div>
	);
};
export default BFDescriptionTab;
