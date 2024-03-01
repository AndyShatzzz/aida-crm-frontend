import './scrollStyles.css';
import { motion, useScroll } from 'framer-motion';
import { NavBar } from '../../widgets/NavBar';
import emailjs from 'emailjs-com';
import AndyPhoto from './image/Avatar.jpg';
import gitHub from './image/gitHub.svg';
import html5 from './image/html5.svg';
import cssImage from './image/css.svg';
import javaScriptImage from './image/javaScript.svg';
import reactImage from './image/reactImage.svg';
import typeScriptImage from './image/typeScriptImage.svg';
import nodeJsImage from './image/nodeJsImage.svg';
import expressJsImage from './image/expressJsImage.svg';
import mongoDbImage from './image/mongoDbImage.svg';
import sassImage from './image/sassImage.svg';
import webpackImage from './image/webpackImage.svg';
import rtkImage from './image/rtkImage.svg';
import mUiImage from './image/mUIImage.svg';
import storeImage from './image/storeImage.png';
import productImage from './image/products.jpeg';
import roleImage from './image/roleWork.jpeg';
import statisticsImage from './image/statistics.jpeg';
import styles from './home.module.scss';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Snackbar, SpeedDial, SpeedDialAction, TextField } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { SnackbarAlert } from '../../shared/snackbarAlert/snackbarAlert';

export const Home = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();

  const form = useForm({
    defaultValues: {
      fromEmail: '',
      fromName: '',
      phoneNumber: '',
      message: ''
    },
    mode: 'onChange'
  });

  const { register, formState } = form;
  const { errors, isSubmitting, isDirty, isValid } = formState;

  function sendEmail(e: any) {
    e.preventDefault();
    setIsSnackbarOpen(true);
    emailjs.sendForm('service_pibp90b', 'template_0rq9l6m', e.target || '', 'EtuIb7Ig5UkGSVB_B').then(
      () => {
        setIsSnackbarOpen(true);
        form.reset();
      },
      error => {
        // eslint-disable-next-line no-console
        console.log(error.text);
      }
    );
  }

  return (
    <>
      <NavBar pageTitle={'Старт'} />
      <SpeedDial
        ariaLabel="social-media"
        sx={{ position: 'fixed', bottom: '30px', right: '30px' }}
        icon={<ShareIcon />}
      >
        <SpeedDialAction
          icon={
            <a
              href="https://github.com/AndyShatzzz"
              target="blank"
            >
              <GitHubIcon sx={{ pt: '5px' }} />
            </a>
          }
          tooltipTitle="GitHub"
        />
        <SpeedDialAction
          icon={
            <a
              href="https://t.me/andyshatzzz"
              target="blank"
            >
              <TelegramIcon sx={{ pt: '5px' }} />
            </a>
          }
          tooltipTitle="Telegram"
        />
        <SpeedDialAction
          icon={
            <a
              href="https://wa.me/79205061158"
              target="blank"
            >
              <WhatsAppIcon sx={{ pt: '5px' }} />
            </a>
          }
          tooltipTitle="WhatsApp"
        />
      </SpeedDial>
      <Snackbar
        autoHideDuration={4000}
        open={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(state => !state)}
      >
        <SnackbarAlert
          severity="success"
          onClose={() => setIsSnackbarOpen(state => !state)}
        >
          Сообщение успешно отправлено
        </SnackbarAlert>
      </Snackbar>
      <motion.div
        className={styles.progressBar}
        style={{ scaleX: scrollYProgress }}
      />
      <section>
        <motion.div
          id="start"
          ref={ref}
          className={styles.mainInfoContainer}
        >
          <div className={styles.layoutContainer}>
            <motion.img
              className={styles.avatar}
              alt="Аватар Андрея"
              src={AndyPhoto}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
            />
            <motion.div
              className={styles.titleContainer}
              initial={{ opacity: 0, scale: 0.5, x: 100 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0, 0.71, 0.2, 1.01] }}
            >
              <motion.h1 className={styles.title}>Привет, меня зовут Андрей</motion.h1>
            </motion.div>
            <motion.div
              className={styles.subtitleContainer}
              initial={{ opacity: 0, scale: 0.5, x: 100 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0, 0.71, 0.2, 1.01] }}
            >
              <motion.h2 className={styles.subtitle}>Я Junior Frontend разработчик</motion.h2>
            </motion.div>
            <motion.div
              className={styles.imageReactContainer}
              initial={{ opacity: 0, scale: 0.5, x: -100 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.4, ease: [0, 0.71, 0.5, 1.01] }}
            >
              <motion.img
                className={styles.reactImage}
                src={reactImage}
                alt="React"
                title="React"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.3 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              />
            </motion.div>
            <motion.div
              className={styles.imageTypeScriptContainer}
              initial={{ opacity: 0, scale: 0.5, x: -100 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.4, ease: [0, 0.71, 0.5, 1.01] }}
            >
              <motion.img
                className={styles.typeScriptImage}
                src={typeScriptImage}
                alt="Type Script"
                title="Type Script"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.6 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              />
            </motion.div>
            <motion.div
              className={styles.imageReduxContainer}
              initial={{ opacity: 0, scale: 0.5, x: -100 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.4, ease: [0, 0.71, 0.5, 1.01] }}
            >
              <motion.img
                className={styles.reduxImage}
                src={rtkImage}
                alt="Redux"
                title="Redux"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.6 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>
      <section>
        <motion.div
          id="aboutMe"
          ref={ref}
          className={styles.aboutMeContainer}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
        >
          <motion.h2 className={styles.aboutMeTitle}>Немножко обо мне</motion.h2>
          <div className={styles.aboutMeInfoContainer}>
            <motion.div className={styles.aboutMeInfoItem}>
              <motion.h3
                className={styles.aboutMeNewMessage}
                initial={{ opacity: 0, scale: 0.5, x: -50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: [0, 0.71, 0.2, 1.01] }}
              >
                Где учился?
              </motion.h3>
              <motion.div
                className={styles.aboutMeMessageContainer}
                initial={{ opacity: 0, scale: 0.5, x: 100 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0, 0.71, 0.2, 1.01] }}
              >
                <p className={styles.aboutMeMessage}>Бакалавриат: РАНХиГС 2014-2018 гг., направление: Юриспруденция</p>
              </motion.div>

              <motion.div
                className={styles.aboutMeMessageContainer}
                initial={{ opacity: 0, scale: 0.5, x: 100 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.4, ease: [0, 0.71, 0.2, 1.01] }}
              >
                <p className={styles.aboutMeMessage}>Магистратура: ЛГТУ 2018-2020 гг., направление: Юриспруденция</p>
              </motion.div>
              {/* <motion.div
                className={styles.aboutMeMessageContainer}
                initial={{ opacity: 0, scale: 0.5, x: 100 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.6, ease: [0, 0.71, 0.2, 1.01] }}
              >
                <p className={styles.aboutMeMessage}>Яндекс практикум: 2022-2023 гг. по направлению Веб-разработка</p>
              </motion.div> */}
            </motion.div>
            <motion.div className={styles.aboutMeInfoItem}>
              <motion.h3
                className={styles.aboutMeNewMessage}
                initial={{ opacity: 0, scale: 0.5, x: -50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.8, ease: [0, 0.71, 0.2, 1.01] }}
              >
                Есть ли опыт работы?
              </motion.h3>
              <motion.div
                className={styles.aboutMeMessageContainer}
                initial={{ opacity: 0, scale: 0.5, x: 100 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2, ease: [0, 0.71, 0.2, 1.01] }}
              >
                <p className={styles.aboutMeMessage}>
                  После изучения в 2022г HTML и CSS устроился в ООО АВК-Консалтинг
                </p>
              </motion.div>
              <motion.div
                className={styles.aboutMeMessageContainer}
                initial={{ opacity: 0, scale: 0.5, x: 100 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2.2, ease: [0, 0.71, 0.2, 1.01] }}
              >
                <p className={styles.aboutMeMessage}>В процессе работы прокачал свои существующие знания</p>
              </motion.div>
              <motion.div
                className={styles.aboutMeMessageContainer}
                initial={{ opacity: 0, scale: 0.5, x: 100 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2.4, ease: [0, 0.71, 0.2, 1.01] }}
              >
                <p className={styles.aboutMeMessage}>
                  Изучил JS, React, Redux, TypeScript, Sass, SCSS, Node.js, Express.js
                </p>
              </motion.div>
            </motion.div>
            <motion.div className={styles.aboutMeInfoItem}>
              <motion.h3
                className={styles.aboutMeNewMessage}
                initial={{ opacity: 0, scale: 0.5, x: -50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2.6, ease: [0, 0.71, 0.2, 1.01] }}
              >
                Какие твои сильные качества характера?
              </motion.h3>
              <motion.div
                className={styles.aboutMeMessageContainer}
                initial={{ opacity: 0, scale: 0.5, x: 100 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2.8, ease: [0, 0.71, 0.2, 1.01] }}
              >
                <p className={styles.aboutMeMessage}>Быстро осваиваю новые направления деятельности</p>
              </motion.div>
              <motion.div
                className={styles.aboutMeMessageContainer}
                initial={{ opacity: 0, scale: 0.5, x: 100 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 3, ease: [0, 0.71, 0.2, 1.01] }}
              >
                <p className={styles.aboutMeMessage}>Способен выдерживать интенсивный режим работы</p>
              </motion.div>
              <motion.div
                className={styles.aboutMeMessageContainer}
                initial={{ opacity: 0, scale: 0.5, x: 100 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 3.2, ease: [0, 0.71, 0.2, 1.01] }}
              >
                <p className={styles.aboutMeMessage}>Сложные ситуации лишь закаляют характер и повышают мотивацию</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>
      <section>
        <motion.div
          id="options"
          ref={ref}
          className={styles.techsWrapper}
          // initial={{ opacity: 0, scale: 0.5 }}
          // whileInView={{ opacity: 1, scale: 1 }}
          // transition={{ duration: 0.8, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
        >
          <motion.h2
            className={styles.aboutMeTitle}
            initial={{ opacity: 0, scale: 0.5, y: -200 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0, 0.71, 0.2, 1.01] }}
          >
            Навыки и Технологии
          </motion.h2>
          <div className={styles.techsContainer}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 200 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0, 0.71, 0.2, 1.01] }}
            >
              <motion.img
                className={styles.imageTechs}
                alt="GIT"
                src={gitHub}
                title="GIT"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 200 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0, 0.71, 0.2, 1.01] }}
            >
              <motion.img
                className={styles.imageTechs}
                alt="HTML5"
                title="HTML5"
                src={html5}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 200 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0, 0.71, 0.2, 1.01] }}
            >
              <motion.img
                className={styles.imageTechs}
                alt="Css"
                title="Css"
                src={cssImage}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 200 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0, 0.71, 0.2, 1.01] }}
            >
              <motion.img
                className={styles.imageTechs}
                alt="Java Script"
                title="Java Script"
                src={javaScriptImage}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 200 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0, 0.71, 0.2, 1.01] }}
            >
              <motion.img
                className={styles.imageTechs}
                alt="React"
                title="React"
                src={reactImage}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 200 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0, 0.71, 0.2, 1.01] }}
            >
              <motion.img
                className={styles.imageTechs}
                alt="Type Script"
                title="Type Script"
                src={typeScriptImage}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 200 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0, 0.71, 0.2, 1.01] }}
            >
              <motion.img
                className={styles.imageTechs}
                alt="NodeJs"
                title="NodeJs"
                src={nodeJsImage}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 200 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0, 0.71, 0.2, 1.01] }}
            >
              <motion.img
                className={styles.imageTechs}
                alt="Express Js"
                title="Express Js"
                src={expressJsImage}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 200 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0, 0.71, 0.2, 1.01] }}
            >
              <motion.img
                className={styles.imageTechs}
                alt="Sass/Scss"
                title="Sass/Scss"
                src={sassImage}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 200 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0, 0.71, 0.2, 1.01] }}
            >
              <motion.img
                className={styles.imageTechs}
                alt="MongoDb"
                title="MongoDb"
                src={mongoDbImage}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 200 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0, 0.71, 0.2, 1.01] }}
            >
              <motion.img
                className={styles.imageTechs}
                alt="Webpack"
                title="Webpack"
                src={webpackImage}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 200 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0, 0.71, 0.2, 1.01] }}
            >
              <motion.img
                className={styles.imageTechs}
                alt="Redux"
                title="Redux"
                src={rtkImage}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              />
            </motion.div>
            <motion.div
              className={styles.photo}
              data-title="MUI"
              initial={{ opacity: 0, scale: 0.5, y: 200 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0, 0.71, 0.2, 1.01] }}
            >
              <motion.img
                className={styles.imageTechs}
                alt="MUI"
                title="MUI"
                src={mUiImage}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>
      <section>
        <motion.div
          id="options"
          ref={ref}
          className={styles.aboutMeContainer}
          // initial={{ opacity: 0, scale: 0.5 }}
          // whileInView={{ opacity: 1, scale: 1 }}
          // transition={{ duration: 0.8, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
        >
          <motion.h2
            className={styles.aboutMeTitle}
            initial={{ opacity: 0, scale: 0.5, y: -100 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0, 0.71, 0.2, 1.01] }}
          >
            О проекте A&F CRM
          </motion.h2>
          <motion.div
            className={styles.aboutProjectContainer}
            initial={{ opacity: 0, scale: 0.5, y: 300 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
          >
            <motion.div
              className={styles.aboutProjectCards}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                className={styles.aboutProjectImage}
                src={storeImage}
                alt="Магазин"
              />
              <h3 className={styles.aboutProjectTitle}>Проект призван автоматизировать работу кальянной</h3>
              <p className={styles.aboutProjectText}>
                Реализована возможность генерации чеков, их регистрация, а также их оплата
              </p>
            </motion.div>

            <motion.div
              className={styles.aboutProjectCards}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                className={styles.aboutProjectImage}
                src={productImage}
                alt="Продукты"
              />
              <h3 className={styles.aboutProjectTitle}>Проект позволяет добавлять продукты по своему усмотрению</h3>
              <p className={styles.aboutProjectText}>
                Реализован функционал добавления продуктов на Backend, устанавливая его изображение, название товара,
                его цену и количество
              </p>
            </motion.div>
            <motion.div
              className={styles.aboutProjectCards}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                className={styles.aboutProjectImage}
                src={roleImage}
                alt="Роли людей"
              />
              <h3 className={styles.aboutProjectTitle}>
                Проект предусматривает распределение ролей для организации работы
              </h3>
              <p className={styles.aboutProjectText}>
                После регистрации пользователь становится по умолчанию официантом с ограниченным функиционалом, для
                открытия полного функционала приложения необходимо получить статус Администратора или Управляющего
              </p>
            </motion.div>
            <motion.div
              className={styles.aboutProjectCards}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                className={styles.aboutProjectImage}
                src={statisticsImage}
                alt="Магазин"
              />
              <h3 className={styles.aboutProjectTitle}>
                Реализована возможность просмотра статистики оборота заведения
              </h3>
              <p className={styles.aboutProjectText}>
                Удобный график позволяет просматривать статистику по дням и по месяцам, выводя суммарный оборот
                заведения, а также оборот наличных и безналичных форм оплаты
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      <section>
        <motion.div className={styles.feedBackContainer}>
          <motion.h2
            className={styles.feedBackTitle}
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0, 0.71, 0.2, 1.01] }}
          >
            Связаться со мной
          </motion.h2>
          <motion.h2
            className={styles.feedBackSubtitle}
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0, 0.71, 0.2, 1.01] }}
          >
            Остались вопросы? Обращайтесь, буду рад Вам помочь!
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -200 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0, 0.71, 0.2, 1.01] }}
          >
            <Box
              component="form"
              method="POST"
              onSubmit={sendEmail}
              sx={{ width: '300px', display: 'flex', flexDirection: 'column' }}
            >
              <TextField
                label="Введите email"
                {...register('fromEmail', {
                  required: {
                    value: true,
                    message: 'Данное поле является обязательным'
                  },
                  pattern: {
                    value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Поле email должно быть вида ivanov@gmail.com'
                  }
                })}
                helperText={errors.fromEmail?.message}
              />
              <TextField
                label="Введите Имя"
                {...register('fromName', {
                  required: {
                    value: true,
                    message: 'Данное поле является обязательным'
                  },
                  pattern: {
                    value: /[a-zA-Zа-яА-ЯЁё -]+$/,
                    message: 'Имя может содержать только латиницу, кириллицу, пробел и дефис'
                  }
                })}
                sx={{ mt: 2 }}
                helperText={errors.fromName?.message}
              />
              <TextField
                label="Введите номер телефона"
                {...register('phoneNumber', {
                  required: {
                    value: true,
                    message: 'Данное поле является обязательным'
                  },
                  pattern: {
                    value: /^7\d{10}$/,
                    message: 'Поле номер телефона должен начинаться с 7 и содержать 11 цифр'
                  }
                })}
                sx={{ mt: 2 }}
                helperText={errors.phoneNumber?.message}
              />
              <TextField
                size="medium"
                label="Введите текст сообщения"
                {...register('message')}
                sx={{ mt: 2 }}
                multiline
                inputProps={{
                  style: {
                    height: '100px'
                  }
                }}
                helperText={errors.message?.message}
              />
              <Button
                sx={{ mt: 2 }}
                type="submit"
                variant="contained"
                disabled={isSubmitting || !isDirty || !isValid}
              >
                Отправить
              </Button>
            </Box>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};
