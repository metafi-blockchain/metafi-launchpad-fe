import React from 'react';
import './index.scss';

const MFSection = ({
	title,
	links = [],
	activeLink = 0,
	children,
	className = '',
	onLinkClick
}) => {
	// return <div className={`bf-section ${className}`}>
	//     <Container>
	//         <div className="bf-section-title responsive glitch" data-text={title}>
	//             {title ? <span>{title}</span> : <></>}
	//             {
	//                 links?.map((link, index) => {
	//                     return <button
	//                         key={index}
	//                         type="button"
	//                         className={activeLink === link.value ? 'active' : ''}
	//                         onClick={() => handleLinkClick(link.value)}
	//                     >
	//                         {link.text}
	//                     </button>
	//                 })
	//             }
	//             <div className='decor' />
	//         </div>
	//         <div className="bf-section-inner">{children}</div>
	//     </Container>
	// </div>

	return (
		<section className="mf-completed-launchpads">
			<div className="container">
				<h2 className="mf-title">{title || ''}</h2>
				<div className="mf-launchpads">
                    <>{children}</>
				</div>
			</div>
		</section>
	);
};
export default MFSection;
