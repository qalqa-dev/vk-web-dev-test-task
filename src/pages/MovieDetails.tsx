import { Icon24Like, Icon28Like } from '@vkontakte/icons';
import {
  DisplayTitle,
  Div,
  Flex,
  Group,
  Headline,
  Paragraph,
  SimpleGrid,
  Title,
  ToolButton,
} from '@vkontakte/vkui';
import { useParams } from 'react-router-dom';
import { Rating } from '../components/Rating/Rating';

export const MovieDetails = () => {
  const { id } = useParams();

  const movie = {
    title: 'Интерстеллар',
    year: 2014,
    rating: 9.0,
    imgUrl:
      'https://kinopoisk-ru.clstorage.net/1q7i0X128/9f245aVG/IHgJIhx9NCrkAc0qrvgn2VrctdlJya47YPNaLD9h6rlQ0niaA5CvU2h3wQvmkg0XxYO94Q0tH7vIeLSqoQgU10S8LLZJ6MUOVJSIzlpdIhxfiDEsjPjKr-WXG_0KtF9Lo9D7uJSyzKHqdQcfgoZ88hBWKeVI6IuOObnF3YKsQSFRe0mCPM0l7nTDzA5vikeaS7xyuLjZmkgCQ22-3aAKKNECiYhWcp9S6Tfk_ANGKmLCtCkGukq6HG2a9C3T2gGB8nsb4n0u1X1mwg7M7eqma3gcI5lYujnqghD83n9AmciwADjqZlL-0wtGpI2A5ioxMiYqN2ta6KzderT9QzkDM3KY-3JML7eM1dEsDh3Il1iIvaPqmRlKiCAjja4vQBgr8qHJyYZg_bM4pLZdcNWIUNGm6HQKCJmuTsumD2PaIYByeRqhz110H6WSnpz_SJRZuH9AC4mISHgQAE9eD0Fr2KNQWppFw23Q2tfm79HFGuGjlZv0-Ts6_e8r5-9xagDAoHpIcg4thrxVQS4MXOtnqruOM_lLO8qLMGNOTw1jumsjg_joFzGu8GhElI6ztFphorYoRehbay--WFf-IBpRcIA5q9McDbZ9NqFOTw0IdBppjQA5K3h5-yLCLk4vM1taQwA72DcSnXPpVyctkwRbchBGirQIKkhvD_i2_uAJY9HyGbkTvW7EXSSBTWwv61SoKCwha2n767gjsK9c3mJZW1Khy4qF4v-zW1VGvWFHeCIR9HhkCbmZvS-bpvyQOdCBcuh7QR1sp2zW4w7eXwjGK3ncU1k5yGm6MHL-7j1T28kS8kjZNBG9wRmFNt-z1RiBsgQYRusLKC7MeaZe80vD0DAZejN-TJVsZaKOvq16tFi63UEI-dmqq0Kw_M3so6kpAFP7u8cxXvEa5zfc40XpgpCkiJZZKsos_etmnWF6cIGASftRDN2GvteBXz3fCAeIO7wiS0u42bvxg4-P3GFbGsMyuihXw70jKYeFb4F1-NAwlHo1GRq5HHwKNb3RiAKCcioqYx8uZc1lUt8cvSm3qTgN42qKuEmJMPKuP85jyIpAEiop9bE901hXZFzRlzsD4fQphmpZuh0u-4XPU-rQEhCKyYOuLVc-RhEcXo8rF6kpLSO7CcoIKBGSTW2u4_jJMzIralTQ7xLqlTeMw7Q4ghAH6iZYqHuNz9pF_LJ7cYCwmbqiDp4F3JTgjZ7vWEfpmt4ACMiL2rsxMi4OHHEbCQEAmusmUP3T6QeGrlF2aPHglAmmKijqPn-4FB0ie-LQwLj6Qe_PtC5X8U68DyoGahq8cln7eHoLoSFcv-1huQlAQjnIN3B8g0iF9IzRB6sR4tdpdLoJOMyti_YcsTiAg9PpCJHdHyaPd3OcTh_atVv6_6GZ2Ti4GaAADa4_UTrqkzCqy7QiL2NLNvVPcUQYQ8AX6jdriRufHinkLKDa0YHy2dnxfV81DNRR_p8_qwVJye9yGDkL2mpAU57OTsO4KSNwSTumwz-zaPbHPcL2CAHDxgoXyqr6fF3Z9t9ya2FwwRjqY_4flywkU36uv1oGOFjeAem5-ci5AmEsLY-hmvvSYcnI5yJc8xtE162zlYiAMte553sa6ZxNqsYO04oR4BEIGQHs7zQ_BGN9To3aFdhoXLMYKbpbyFCAPL-Pk8sJcYIZGHRxrKB5J7RskJdLkFJVyFdY6rqtDbj3jhG6AKABeCvRHE7mDyQhzy9_SyXL6A8Tqusam-hR43xMvqO4-CCSS_iGYCzBmLblnCL1-PPQ55oWWJrbrr7Y971R2dDSoyuZ0x9-JL8VsA59bFmVW0kfQiuJC5tIMEK-PL6xaQjxItvYV2JNAho3Nm6i1nuBw0SZh3lYeo482NZ-sAnSEKBJCaAdLwWNVIG8ft5YBKvLzjEY60qJaQEDTpzukxkZwBKauNZDXRO5F4SuQeWpEGD0eBbpGWosbzrXviI4gNHSyZkhLX9WXRXQrjxdC5dKO62RGzvaObmTkW1sbUAY6hFDmxmnMS2geyanTtHHaDPy5rs1eroqbl2ItA_z61GScRo58excZC8Hst9O33u3GhgNIhjrS2nYUkKc7H5yGspgwDrqpyEeocqUNowTtDkwQKZ6JVrLeh8eC8Tc84iz8pLrS6PMPAVvpcMfXC16hnoanXAayUlpSUKQLl7Ow0tas2PqqPRijsILh2assNYYgvLmagU7WSm8fYr0PtPZwxNAqMnDzUwmT0dS3WytyPcLWa5weMi6yZoh0n-t3dH52KCSaTulwI0j6YVHHqLGWwGi9flH6qprPx36JwzQy-FgAHmosl1cZn6H0awMHck32_ieAgmKyNtbYiBtfx8CW-lSsWj6VmBNslslNL5T50tRspTYtGraaHzcSteM86ixUgBYOBMd_xR_JZLvXW2aVpt7DCJ7ycqaOHGzb6xO09kJUSC4uKTSnxHK5MZ80xaZITOm-nV5STsdrjl2rDI5c_NCeuhzfp83zZVCHD4NWTXL-_ywqbgIGjpi8w9djlErSCCD-Nj38MySamSVnkHHGlEhxph2esp5rD_pRY4BaLGAcKnoYA7_VUzFsJ-c34un-ih90ZqbSHuJ0TKP3i0TeqkgcnmZ5EDc8FsFBI6x5IlgwmdZh9qqS54ualY_4MtDkiKZO3DPX5S9hHK_vFwopfgYfnIIuRgJ2gIC_G0vImsJ0yIpSjRQvSOY5fcvk6RbseD0eTVo-XgsrkmnrPDJwxGzSZpz735UX4VBTRz_iUXJCd1B-QnYuhgh0LzertKJymGCS5iGQH1ySKSnHLNH6VPCR6qE-qu4rg2bta0gOWFgstgpcGy9Jg5G8qzcLer1K5n_IYmZ6AubQgL-PN1wmlqAEiraBiAPM5jX1e-ytIuxoEdp5rtoqhx9KeRP4zqiI9KpGcLOrpSe9UMczS3qxpsKDUPoCIna-SAgbJyuoRnIYwLJ-dfBrWJIpST9sZY6wCOlSVfJSAs9jMp10',
    description:
      'Когда засуха, пыльные бури и вымирание растений приводят человечество к продовольственному кризису, коллектив исследователей и учёных отправляется сквозь червоточину (которая предположительно соединяет области пространства-времени через большое расстояние) в путешествие, чтобы превзойти прежние ограничения для космических путешествий человека и найти планету с подходящими для человечества условиями.',
    genres: ['фантастика', 'приключения', 'фэнтези'],
    director: 'Кристофер Нолан',
    composer: 'Ханс Циммер',
  };

  return (
    <Group style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Flex justify="center">
        <img src={movie.imgUrl} alt={movie.title + 'image'} />
        <Div>
          <Flex gap="m">
            <DisplayTitle style={{ fontSize: '32px' }} level="1">
              {movie.title}
            </DisplayTitle>
            <Rating rating={movie.rating} />
          </Flex>

          <Title level="2">О фильме</Title>
          <SimpleGrid columns={2} margin="auto-block">
            <Headline>Год выпуска</Headline>
            <Paragraph>{movie.year}</Paragraph>

            <Headline>Жанр</Headline>
            <Paragraph>{movie.genres.join(', ')}</Paragraph>

            <Headline>Режиссер</Headline>
            <Paragraph>{movie.director}</Paragraph>

            <Headline>Композитор</Headline>
            <Paragraph>{movie.composer}</Paragraph>
          </SimpleGrid>
          <div style={{ padding: '10px 0' }}>
            <Paragraph>{movie.description}</Paragraph>
          </div>
          <ToolButton IconCompact={Icon24Like} IconRegular={Icon28Like}>
            Добавить в понравившиеся
          </ToolButton>
        </Div>
      </Flex>
    </Group>
  );
};
