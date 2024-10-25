import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './index.scss';

const BFDescriptionTab = ({ data }) => {
	return (
		<div
			class="tab-pane fade description-tab-pane show active"
			id="description-tab-pane"
			role="tabpanel"
			aria-labelledby="description-tab"
			tabIndex="0"
		>
			<div class="row gx-lg-5">
				<div class="col-lg-3 pe-lg-0">
					<div class="menu">
						<img src="images/menu-bg.png" alt="" class="w-100" />
						<div class="menu-inner">
							<span>SECTIONS</span>
							<ul>
								{data?.articles.map((item, index) => (
									<li key={item.id}>
										<a
											href={'/projects/1#article' + item.id}
											class={`${index == 0 ? 'active' : ''} `}
										>
											{item.title}
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
				<div class="col-lg-9 ps-lg-5">
					<div class="text-content">
						{data?.articles.map((item, key) => (
							<>
								{key === 0 ? (
									<h2 id={'article' + item.id} key={item.id}>
										{item.title}
									</h2>
								) : (
									<h3 id={'article' + item.id} key={item.id}>
										{item.title}
									</h3>
								)}
								<p dangerouslySetInnerHTML={{ __html: item.text }}></p>
							</>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
export default BFDescriptionTab;
