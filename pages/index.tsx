import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import client from "../contentful/index";
import { IArticle, IArticleFields, IHomePage, IHomePageFields } from "../contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Container, Row, Col, Card, CardTitle, CardText, Button } from "reactstrap";
import Link from "next/link";

type HomeProps = {
  home: IHomePage;
  articles: IArticle[];
};

const Home: NextPage<HomeProps> = ({ home, articles }) => {
  return (
    <div>
      <Head>
        <title>{home.fields.title}</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <main>
        <div
          className="text-center p-5 text-white"
          style={{
            background: `url("https:${home.fields.background?.fields.file.url}") no-repeat center / cover`,
            minHeight: 300,
          }}
        >
          <h1 className="mt-5">{home.fields.title}</h1>
          <div className="mb-5">{documentToReactComponents(home.fields.description!)}</div>
        </div>
        <Container className="pt-5 ">
          <Row>
            {articles.map((article, idx) => {
              return (
                <Col sm={4} key={idx} >
                  <Card body>
                    <CardTitle>{article.fields.title}</CardTitle>
                    <CardText>{article.fields.description}</CardText>
                    <Link href={`/articles/${article.fields.slug}`} passHref>
                      <Button>{article.fields.action}</Button>
                    </Link>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const home = await client.getEntries<IHomePageFields>({
    content_type: "homePage",
    limit: 1,
  });

  const articleEntries = await client.getEntries<IArticleFields>({
    content_type: "article",
    select: "fields.title,fields.slug,fields.description,fields.action",
  });

  const [homePage] = home.items;
  console.log(home.items)

  return {
    props: {
      title: "Gothic Space",
      home: homePage,
      articles: articleEntries.items,
    },
    revalidate: 3600,
  };
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   console.log("props");
//   return {
//     props: {
//       title: "My Gothic Space",
//     },
//   };
// };

export default Home;
