import Head from 'next/head'

const Seo = ({title = 'DevShop',description = 'Compre artigos eletrônicos agora'}) => {
  return (
    <Head>
        <title>{title}</title>
        <meta name ='description' content = {description}/>
    </Head>
  )
}

export default Seo