import Image from 'next/image'
import Background from '@/assets/images/bg.png'
import UITitle from "@/shared/uikit/UITitle";
import UiLink from "@/shared/uikit/UILink";

export default async function Home() {
    // const nominations = await findAllNominations()
    // const candidatesPromises = nominations.map(n => findCandidatesByNomination(n._id))
    // const candidates = await Promise.all(candidatesPromises)
    return (
        <div className={'relative h-full flex flex-col bg-blue grow h-[calc(100vh - 88px])]'}>

            <div className={'relative z-10 pt-24 flex flex-col grow items-center gap-10'}>

                <UITitle className={'max-w-[280px] text-4xl'} align={'center'} color={'white'} >Народный рейтинг</UITitle>
                <p className={'text-lg text-white text-center w-[80%] font-bold'}>

                    Экслюзивный рейтинг государственных служащих, составленный Repost.uz на основе честного и объективного
                    голосования граждан со всех уголков Узбекистана.
                </p>
                <UiLink variant={'green'} to={'/nominations'}>Проголосовать</UiLink>
            </div>
            <div className={'absolute left-0 right-0 z-0 h-[50vh] bottom-0'}>
                <Image src={Background.src} alt={''} style={{maxHeight:'50vh', objectFit:'cover'}} fill={true} quality={100}/>

            </div>

        </div>


    )
}
