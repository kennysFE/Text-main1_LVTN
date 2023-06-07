import React from 'react'

type Props = {}

export default function PopUpInfoCover({}: Props) {
  return (
    <>
    <div className="grid grid-cols-2 gap-4">
        <div className="text-sm">
          <h2 className="font-bold">Bảo đảm bảo vệ đặt phòng</h2>
          <p>Trong trường hợp hãn hữu khi Chủ nhà cần hủy đặt phòng của bạn trong vòng 30 ngày trước ngày nhận phòng, chúng tôi sẽ tìm cho bạn một chỗ ở tương tự hoặc tốt hơn, hoặc sẽ hoàn tiền cho bạn.</p>
        </div>
        <div className="text-sm">
          <h2 className="font-bold">Bảo đảm nhận phòng</h2>
          <p>Nếu bạn không thể nhận phòng và Chủ nhà không thể giải quyết vấn đề này, chúng tôi sẽ tìm cho bạn một chỗ ở tương tự hoặc tốt hơn có thời gian ở tương đương, hoặc chúng tôi sẽ hoàn tiền cho bạn.</p>
        </div>
        <div className="text-sm">
          <h2 className="font-bold">Bảo đảm chi phí tương xứng</h2>
          <p>Trong thời gian ở, nếu bạn nhận thấy chỗ ở không đúng như quảng cáo, ví dụ như tủ lạnh ngừng hoạt động và Chủ nhà không thể dễ dàng khắc phục vấn đề này, hoặc số phòng ngủ ít hơn so với thông tin trên mục cho thuê, thì bạn sẽ có 3 ngày để báo cáo vấn đề. Khi đó, chúng tôi sẽ tìm cho bạn một chỗ ở tương tự hoặc tốt hơn, hoặc chúng tôi sẽ hoàn tiền cho bạn.</p>
        </div>
        <div className="text-sm">
          <h2 className="font-bold">Đường dây an toàn 24 giờ</h2>
          <p>Nếu cảm thấy không an toàn, bạn sẽ được ưu tiên liên hệ với nhân viên hỗ trợ an toàn được đào tạo đặc biệt của chúng tôi, bất kể ngày đêm.</p>
        </div>  
    </div>
    <div className="mt-10">
      <p>Hãy truy cập <a  href="https://www.airbnb.com.vn/help/article/3218/%C4%91%C6%B0%E1%BB%A3c-b%E1%BA%A3o-v%E1%BB%87-th%C3%B4ng-qua-aircover" className="font-bold underline hover:text-black hover:underline">Trung tâm trợ giúp</a> của chúng tôi để biết đầy đủ thông tin chi tiết về cách Airbnb bảo vệ đặt phòng của bạn</p>
    </div>
    </>
  )
}