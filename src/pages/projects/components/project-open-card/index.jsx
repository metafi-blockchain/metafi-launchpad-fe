import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./index.scss";

const BFProjectOpenCard = ({ item }) => {
    return <div className='bf-project-open'>
        <Row className='gx-md-5'>
            <Col lg="7">
                <div className='bf-project-open-left'>
                    <div className='logo'>
                        <img src={` https://blastfi.net/assets/${item.logo}`} alt={item.name} />
                    </div>
                    <div className="status">
                        <span>Open</span>
                        <span> - {item.contract !== 'TBA' ? item.symbol : ''}</span>
                        {item.athMultiplier && <span> - <small>ATH</small>&nbsp;<b>{item.athMultiplier}x</b></span>}
                    </div>
                    <Link to={`projects/${item.id}`} className="name">{item.name}</Link>
                    <Row className='gx-md-5'>
                        <Col md="6">
                            <div className="description">{item.description}</div>
                            <div className="socials">
                                <span>Available On</span>
                                {
                                    item.pancakeswap &&
                                    <a style={{ backgroundColor: '#47d4dc' }} href={item.pancakeswap} target="_blank" rel="noopener noreferrer">
                                        <img height="18" src="/images/pancake-swap.png" alt="" />
                                    </a>
                                }
                                {
                                    item.website &&
                                    <a href={item.website} target="_blank" rel="noopener noreferrer"><i className="fas fa-globe"></i></a>
                                }
                                {
                                    item.twitter &&
                                    <a href={item.twitter} target="_blank" rel="noopener noreferrer">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.51074 2.5L8.18213 11.0059L2.70972 17.5H4.34424L8.90356 12.0898L12.5107 17.5H12.8452H17.5095L11.6953 8.77686L16.9846 2.5H15.3501L10.9739 7.69409L7.51074 2.5H2.51074ZM4.84717 3.75H6.8418L15.1743 16.25H13.1797L4.84717 3.75Z" fill="currentColor" />
                                        </svg>
                                    </a>
                                }
                                {
                                    item.medium &&
                                    <a href={item.medium} target="_blank" rel="noopener noreferrer"><i className="fab fa-medium-m"></i></a>
                                }
                                {
                                    item.telegram &&
                                    <a href={item.telegram} target="_blank" rel="noopener noreferrer">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.751 2.39449C17.5562 2.40303 17.3665 2.45726 17.1955 2.52574C17.0262 2.59376 16.0517 3.00969 14.6127 3.62496C13.1736 4.24022 11.303 5.04142 9.44863 5.83589C5.73993 7.42483 2.0955 8.98824 2.0955 8.98824L2.12206 8.97808C2.12206 8.97808 1.9021 9.0516 1.6791 9.20699C1.56759 9.28468 1.44763 9.38498 1.34941 9.53121C1.25119 9.67743 1.17938 9.88467 1.20644 10.1039C1.30149 10.8738 2.09941 11.0921 2.09941 11.0921L2.10253 11.0937L5.66347 12.3125C5.75426 12.6153 6.74352 15.9171 6.96113 16.6164C7.08131 17.0029 7.1938 17.226 7.31113 17.3781C7.36984 17.4542 7.43138 17.5131 7.49941 17.5562C7.52644 17.5733 7.55487 17.5862 7.583 17.5976H7.58457C7.58802 17.5991 7.59127 17.5993 7.59472 17.6007L7.58535 17.5984C7.59188 17.601 7.59833 17.6055 7.60488 17.6078C7.61757 17.6122 7.62535 17.6121 7.6416 17.6156C8.04941 17.758 8.38691 17.4937 8.38691 17.4937L8.40097 17.4828L10.5885 15.4539L14.1385 18.2218L14.183 18.2421C14.8044 18.518 15.3663 18.3641 15.6775 18.1109C15.9887 17.8577 16.1111 17.5312 16.1111 17.5312L16.1244 17.4968L18.733 3.90074C18.7998 3.59656 18.8092 3.33364 18.7463 3.09605C18.6833 2.85846 18.5304 2.65193 18.3385 2.53746C18.1466 2.42298 17.9458 2.38594 17.751 2.39449ZM17.7721 3.20777C17.8512 3.2041 17.9098 3.21315 17.9283 3.22417C17.9468 3.2352 17.9551 3.23375 17.9728 3.30074C17.9906 3.36773 18.0002 3.50882 17.9518 3.72964L17.9502 3.73433L15.3564 17.2515C15.3503 17.2651 15.2962 17.3902 15.1728 17.4906C15.047 17.593 14.9069 17.673 14.5353 17.5171L10.6533 14.4898L10.5439 14.4039L10.5416 14.4062L9.38066 13.5351L15.9049 5.85933C15.955 5.8005 15.987 5.72841 15.9971 5.65178C16.0071 5.57514 15.9947 5.49724 15.9614 5.42749C15.9281 5.35774 15.8753 5.29913 15.8094 5.25876C15.7435 5.21838 15.6673 5.19795 15.59 5.19996C15.5145 5.20192 15.4411 5.22521 15.3783 5.26714L5.93769 11.5609L2.37128 10.3398C2.37128 10.3398 2.01714 10.1427 2.00019 10.0054C1.99925 9.99782 1.99507 10.0047 2.01347 9.9773C2.03187 9.9499 2.07813 9.90365 2.13613 9.86324C2.25212 9.78242 2.38456 9.73355 2.38456 9.73355L2.39785 9.72886L2.41113 9.72339C2.41113 9.72339 6.05575 8.15991 9.76425 6.57105C11.6185 5.77662 13.4888 4.976 14.9275 4.36089C16.3659 3.74594 17.4052 3.3033 17.4932 3.26792C17.5933 3.22781 17.6929 3.21143 17.7721 3.20777ZM13.4455 7.51714L8.49785 13.3382L8.4955 13.3406C8.48778 13.3499 8.48048 13.3595 8.47363 13.3695C8.46578 13.3803 8.45848 13.3915 8.45175 13.4031C8.42395 13.4503 8.40614 13.5026 8.39941 13.557C8.3994 13.558 8.3994 13.5591 8.39941 13.5601L7.75488 16.4585C7.74416 16.4272 7.73666 16.4158 7.72519 16.3789V16.3781C7.52048 15.7203 6.58713 12.6064 6.458 12.1757L13.4455 7.51714ZM9.05644 14.2921L9.9455 14.9593L8.63925 16.1703L9.05644 14.2921Z" fill="currentColor" />
                                        </svg>
                                    </a>
                                }
                            </div>
                        </Col>
                        <Col md="6">
                            <Link to={`projects/${item.id}`} className="cta">
                                <span>Join Now</span>
                            </Link>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col lg="5">
                <div className='divider'></div>
                <div className='bf-project-open-right'>
                    <Link to={`projects/${item.id}`}>
                        <div className="logo">
                            <img src={` https://blastfi.net/assets/${item.logo}`} alt={item.name} />
                        </div>
                    </Link>
                    <div className='inner'>
                        <div className="detail">
                            <ul>
                                <li>
                                    <span>Swap rate</span><br />
                                    <b className="nowrap text-white">
                                        1 {item.symbol} = {(item["rate"])} {item["projectTokenSymbol"]}
                                    </b>
                                </li>
                                <li>
                                    <span>Cap</span><br />
                                    <b className="nowrap text-white">
                                        {`${item.maxTotalParticipationAllocated || 0} ${item.symbol || ""}`}
                                    </b>
                                </li>
                                <li>
                                    <span>Access</span><br />
                                    <b className="nowrap text-white">
                                        {item.isPrivate ? "Private" : "Public"}
                                    </b>
                                </li>
                                <li>
                                    {
                                        item.state === 'O' ?
                                            <div className={item.state === 'O' ? 'ai-project-progress-wrap light-progress disabled' : 'ai-project-progress-wrap'}>
                                                <div className="mb-2 d-flex justify-content-between align-items-center ai-project-progress-top">
                                                    <div className="ai-project-col">Progress</div>
                                                    {item.state !== 'O' && <div className="ai-project-col ai-project-col-participants text-end">Participants <b className="text-participants font-12">{item['totalCountUserParticipated']}</b></div>}
                                                </div>
                                                <div className='ai-project-progress'>
                                                    <div className="ai-project-progress-percent" style={{ width: `${(item.totalFundParticipated / item.maxTotalParticipationAllocated || 0) * 100}%` }}></div>
                                                    <div className="ai-project-progress-label">

                                                        <span className="participants-center" >Allocation round</span>
                                                        <span className="participants-center" style={{ top: "8px" }}><b>{item['totalCountUserParticipated']}</b> Participants</span>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <>
                                                <div className={'ai-project-progress-wrap'}>
                                                    <div className="mb-2 d-flex justify-content-between align-items-center ai-project-progress-top">
                                                        <div className="ai-project-col">Progress</div>
                                                        <div className="ai-project-col ai-project-col-participants text-end">Participants <b className="text-participants font-12">{item['totalCountUserParticipated']}</b></div>
                                                    </div>
                                                    <div className='ai-project-progress'>
                                                        <div className="ai-project-progress-percent" style={{ width: `${(item.totalFundParticipated / item.maxTotalParticipationAllocated || 0) * 100}%` }}></div>
                                                        <div className="ai-project-progress-label">
                                                            <span><b>{((item.totalFundParticipated / item.maxTotalParticipationAllocated || 0) * 100).toFixed(2)}%</b></span>
                                                            {item.state === 'O' && <span className="participants-center" style={{ top: "8px" }}><b>{item['totalCountUserParticipated']}</b> Participants</span>}
                                                            <span className="text-allocation"><b>{item.totalFundParticipated.toFixed(4)}/{item.maxTotalParticipationAllocated}</b></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                    }
                                </li>
                            </ul>
                        </div>
                        {
                            item.button_name && <a href={item.button_url} target="blank" className="cta">
                                <span>{item.button_name}</span>
                            </a>
                        }
                    </div>
                </div>
            </Col>
        </Row>
    </div>
}
export default BFProjectOpenCard