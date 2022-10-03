import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { PageHeader } from '../../components/organisms/PageHeader';
import { PlacesSvg } from '../../assets/svg/places.svg';
import { Image } from '../../components/atoms/Image';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { googleMapOptions } from '../../config/googlemap.config';
import { Place } from '../../types/model.types';
import { PLACES } from '../../assets/mock/places.mock';
import { Iconify } from '../../components/atoms/Iconify';

export const PlacesPage: React.FC = () => {
  const [places, setPlaces] = useState<Place[] | undefined>();
  const [placesHoveredMap, setPlacesHoveredMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      setPlaces(PLACES);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  const setPlaceHover = (placeId: string, isHovered: boolean) => {
    setPlacesHoveredMap((prev) => ({ ...prev, [placeId]: isHovered }));
  };
  const getPlaceHover = (placeId: string) => {
    return placesHoveredMap[placeId];
  };

  return (
    <Paper sx={{ p: 5 }}>
      <PageHeader
        title={'Places'}
        subtitle={'Look for places where you can meet with new friends'}
        Svg={PlacesSvg}
        getBackground={(theme) => theme.palette.text.secondary}
      />
      <Box mt={3}>
        <Grid container spacing={3}>
          {(places ?? [...Array(6)]).map((place: Place | undefined, index) => (
            <Grid key={`placeItem${index}`} item xs={4}>
              {place ? (
                <PlaceItem
                  place={place}
                  isHovered={getPlaceHover(place.id)}
                  setIsHovered={(isHovered) => setPlaceHover(place.id, isHovered)}
                />
              ) : (
                <Skeleton variant='rectangular' height={350} />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

interface ItemProps {
  place: Place;
  isHovered: boolean;
  setIsHovered: (value: boolean) => void;
}

const PlaceItem: React.FC<ItemProps> = ({ place, isHovered, setIsHovered }) => {
  return (
    <Paper sx={{ height: '100%', borderRadius: 1 }}>
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            top: 0,
            left: 0,
            zIndex: 8,
            background: 'rgb(0 0 0 / 50%)',
            borderRadius: 1
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            zIndex: 9
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <GoogleMap
            center={{ lat: place.lat, lng: place.lng }}
            zoom={14}
            options={googleMapOptions}
            mapContainerStyle={{
              width: isHovered ? '200px' : '150px',
              height: isHovered ? '200px' : '150px',
              borderTopLeftRadius: '6px',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <MarkerF position={{ lat: place.lat, lng: place.lng }} />
          </GoogleMap>
        </Box>
        <Image alt={place.name} src={place.cover} ratio='1/1' sx={{ borderRadius: 1 }} />
      </Box>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant='subtitle1' fontSize={18}>
          {place.name}
        </Typography>
        <Stack direction='row' spacing={1}>
          <Box>
            <Iconify icon={'ic:baseline-place'} width={20} height={20} />
          </Box>
          <Box sx={{ fontSize: 14 }}>{place.address}</Box>
        </Stack>
        <Stack direction='row' spacing={1}>
          <Box>
            <Iconify icon={'bx:category-alt'} width={20} height={20} />
          </Box>
          <Box sx={{ fontSize: 14 }}>{place.category.name}</Box>
        </Stack>
        <Stack direction='row' spacing={1}>
          <Box>
            <Iconify icon={'fluent:text-description-20-filled'} width={20} height={20} />
          </Box>
          <Box sx={{ fontSize: 14 }}>{place.description}</Box>
        </Stack>
      </Stack>
    </Paper>
  );
};
