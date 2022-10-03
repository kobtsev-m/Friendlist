import React, { useEffect, useState } from 'react';
import Slider, { Settings as SliderSettings } from 'react-slick';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { CarouselDots } from '../../../components/molecules/CarouselDots';
import { alpha, Skeleton, useTheme } from '@mui/material';
import { Image } from '../../../components/atoms/Image';
import { CATEGORIES } from '../../../assets/mock/categories.mock';
import { Category } from '../../../types/model.types';

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.55)
}));

export const CategoriesForUser: React.FC = () => {
  const theme = useTheme();
  const [categories, setCategories] = useState<Category[] | undefined>();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      setCategories(CATEGORIES);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  const sliderSettings: SliderSettings = {
    speed: 1500,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 10000,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({ position: 'absolute', right: 24, bottom: 24, color: 'white' })
  };

  if (!categories) {
    return <Skeleton variant='rectangular' height={320} />;
  }
  return (
    <Slider {...sliderSettings}>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </Slider>
  );
};

interface ItemProps {
  category: Category;
}

const CategoryItem: React.FC<ItemProps> = ({ category }) => {
  const { cover, name, title } = category;
  return (
    <Box sx={{ position: 'relative' }}>
      <CardContent
        sx={{
          left: 0,
          bottom: 0,
          zIndex: 9,
          maxWidth: '80%',
          position: 'absolute',
          color: 'common.white',
          ml: 1
        }}
      >
        <Typography noWrap variant='h5' sx={{ mt: 1, mb: 1 }}>
          {name}
        </Typography>
        <Typography noWrap sx={{ opacity: 0.8, mb: 3 }}>
          {title}
        </Typography>
        <Button to='#' variant='contained' component={RouterLink} sx={{ mb: 2 }}>
          View category
        </Button>
      </CardContent>
      <OverlayStyle />
      <Image alt={name} src={cover} sx={{ height: 320 }} />
    </Box>
  );
};
