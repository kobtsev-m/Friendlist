import React, { useEffect, useState } from 'react';
import { Box, Button, colors, Grid, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { CategoriesSvg } from '../../assets/svg/categories.svg';
import { CATEGORIES } from '../../assets/mock/categories.mock';
import { Image } from '../../components/atoms/Image';
import { Search } from '../../components/molecules/Search';
import { Category } from '../../types/model.types';
import { Sort } from '../../components/molecules/Sort';
import { Iconify } from '../../components/atoms/Iconify';
import { PageHeader } from '../../components/organisms/PageHeader';

export const CategoriesPage: React.FC = () => {
  const [categoriesHoverMap, setCategoriesHoverMap] = useState<Record<string, boolean>>({});
  const [categories, setCategories] = useState<Category[] | undefined>();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      setCategories(CATEGORIES);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  const setCategoryHover = (categoryId: string, isHovered: boolean) => {
    setCategoriesHoverMap((prev) => ({ ...prev, [categoryId]: isHovered }));
  };
  const getCategoryHover = (categoryId: string) => {
    return categoriesHoverMap[categoryId];
  };

  return (
    <Paper sx={{ p: 5 }}>
      <PageHeader
        title={'Categories'}
        subtitle={'Here are presented all the categories and their related information'}
        Svg={CategoriesSvg}
        getBackground={(theme) => theme.palette.primary.main}
      />
      <Stack mt={3} direction='row' alignItems='center' justifyContent='space-between'>
        <Search<Category>
          placeholder={'Search category...'}
          onSearch={() => new Promise((r) => setTimeout(() => r(CATEGORIES), 1000))}
          onClick={(id: string) => console.log('open category with id:', id)}
        />
        <Stack direction='row'>
          <Sort
            query={'latest'}
            options={[
              { label: 'Latest', value: 'latest' },
              { label: 'Popular', value: 'popular' }
            ]}
            onSort={(value: string) => console.log('sort categories by:', value)}
          />
          <Button variant='outlined' sx={{ height: 39, ml: 2 }}>
            Add new <Iconify icon={'akar-icons:plus'} sx={{ ml: 1 }} />
          </Button>
        </Stack>
      </Stack>
      <Box mt={3}>
        <Grid container spacing={3}>
          {(categories ?? [...Array(5)]).map((category, index) => (
            <Grid key={`categoryItem${index}`} item xs={12}>
              {category ? (
                <CategoryItem
                  category={category}
                  isHovered={getCategoryHover(category.id)}
                  setIsHovered={(isHovered) => setCategoryHover(category.id, isHovered)}
                />
              ) : (
                <Skeleton variant='rectangular' height={300} />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

interface ItemProps {
  category: Category;
  isHovered: boolean;
  setIsHovered: (value: boolean) => void;
}

const CategoryItem: React.FC<ItemProps> = ({ category, isHovered, setIsHovered }) => {
  return (
    <Box
      sx={{ position: 'relative', display: 'block', overflow: 'hidden' }}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9,
          cursor: 'pointer',
          background: colors.grey[900],
          opacity: 0.75
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography variant='button' color={colors.grey[50]} fontSize={20}>
            {category.name}
          </Typography>
          <Typography
            variant='subtitle1'
            color={colors.grey[50]}
            fontSize={14}
            sx={{
              mt: 2,
              opacity: 0,
              transform: 'translateY(-30px)',
              transition: 'all 0.5s ease-in-out',
              ...(isHovered && {
                opacity: 1,
                transform: 'translateY(0)'
              })
            }}
          >
            {category.title}
          </Typography>
        </Box>
      </Box>
      <Image
        src={category.cover}
        sx={{
          height: 300,
          objectFit: 'cover',
          transition: 'all 0.5s ease-in-out',
          ...(isHovered && {
            transform: 'scale(2) rotate(-10deg)'
          })
        }}
      />
    </Box>
  );
};
