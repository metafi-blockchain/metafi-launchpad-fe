import React from 'react';
import './index.scss';

const BFTokenInformation = ({ showAddToken, onAddToken, selectedProject }) => {
	return (
		<div class="pool-information">
			<img src="images/token-info-bg.png" alt="" class="w-100" />
			<div class="pool-information-inner">
				<span class="mb-3">Token information</span>
				<ul>
					<li>
						<span>Name</span>
						<b>{selectedProject?.name}</b>
					</li>
					<li>
						<span>Token Symbol</span>
						<b>{selectedProject?.projectTokenSymbol}</b>
					</li>
				</ul>
				{showAddToken >= 0 && (
					<button type="button" onClick={onAddToken}>+Add token to MetaMark</button>
				)}
			</div>
		</div>
	);
};
export default BFTokenInformation;
