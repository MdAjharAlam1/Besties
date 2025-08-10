
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Card from '../../shared/Card';
import SmallButton from '../../shared/SmallButton';

const FriendSuggestion= () => {
  return (
    <Card title="Suggestion" divider>
        <div>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                pagination={{
                    clickable:true
                }}
                breakpoints={{
                    0:{
                        slidesPerView:2,
                    },
                    640:{
                        slidesPerView:3,
                    },
                    1024:{
                        slidesPerView:4,
                    }
                }}
                className="mySwiper"
            >
                {
                    Array(5).fill(0).map((index)=>{
                       return  <SwiperSlide key={index}>

                                    <div className='flex flex-col items-center gap-2 border border-gray-100 rounded-lg p-4 '>
                                        <img 
                                            src="https://th.bing.com/th/id/OIP.aw2_9W3UMRsvRuSqSJlE1QHaHa?pid=ImgDet&w=195&h=195&c=7&dpr=1.4" 
                                            alt="profile image"
                                            className='w-[60px] h-[60px] rounded-full object-center' 
                                        />
                                        <h1 className='text-base font-medium text-black'>Md Ajhar Alam</h1>
                                        <SmallButton type='success' icon='user-add-line'>Add</SmallButton>
                                    </div>
                       
                                </SwiperSlide>
                        
                    })
                }

            </Swiper>
        </div>
    </Card>
  );
}

export default FriendSuggestion
