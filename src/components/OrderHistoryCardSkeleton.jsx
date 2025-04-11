import Skeleton from "react-loading-skeleton"

import '../styles/CardHistory.css';

function OrderHistoryCardSkeleton({ cardCount }) {
  return Array(cardCount).fill(0)
  .map((_, index) => (
    <div className="card_history_wrapper" key={index}>
        <div className="card_history_inner">
            <div className="card_history_top">
                <Skeleton width={120}/>
                <Skeleton width={30}/>
            </div>
            <div className="card_history_bottom">
                <Skeleton height={120} width={320}/>
            </div>
        </div>
    </div>
  ))
}

export default OrderHistoryCardSkeleton