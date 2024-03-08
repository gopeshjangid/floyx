'use client';
import { v4 } from 'uuid';
import IconButton from '@mui/material/IconButton'
import CancelIcon from '@mui/icons-material/Cancel'
import {
  Box,
  Stack,
  Typography,
  useTheme,
  FormControl,
  FormLabel,
  TextareaAutosize,
  Grid
} from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import ArticleItems from './article-items';
import ImageIcon from '@/assets/images/svg/image';
import Image from 'next/image';
import {
  useCreateArticleDraftMutation,
  useLazyGetDraftDetailQuery,
  usePublishArticleMutation,
  useUpdateDraftArticleMutation,
} from '@/lib/redux';
import { useToast } from '../Toast/useToast';
import TagAutocomplete from './articleTags';
import { useRouter } from 'next/navigation';
import { revalidateArticleDetail } from '@/actions/actions';
import { useTranslation } from 'react-i18next';

export const AddArticleFormBox = styled(Box)(({ theme }) => ({
  '& h5': {
    color:
      theme.palette?.mode === 'light'
        ? theme.palette.text.primary
        : theme.palette?.action?.svg,
  },
  '.photoImage': {
    color:
      theme.palette?.mode === 'light'
        ? theme.palette.text.primary
        : theme.palette?.action?.svg,
  },
}));

const Textarea = styled(TextareaAutosize)(({ theme }) => ({
  width: '100%',
  border: '0px',
  backgroundColor: theme.palette.background.default,
  fontWeight: '600',
  fontSize: '38px',
  paddingLeft: 0,
  overflow: 'auto',
  textOverflow: 'ellipsis',
  outline: 'none',
  color: '#85838F',
}));

 function AddArticleForm({
  isPublish,
  saveDraft,
  setIsDisabled,
  setSaveDraft,
  setIsPublish,
  articleId,
  setArticleId,
  isEditing,
  setIsPublished,
  isReset,
}: any) {
  const router = useRouter(); 
  const {t}=useTranslation()

  const [articleCreated, setArticleCreated] = useState<boolean>(false);
  const [startAutoSave, setStartAutoSave] = useState<boolean>(false);
  const articleCreatedRef = useRef(false);
  const toast = useToast();
  const [resetAll, setResetAll] = useState(false);
  const [syncState, setSyncState] = useState<any>({
    syncContent: '',
    syncCoverPhoto: '',
    syncTitle: '',
    syncHashTag: '',
  });
  const { palette } = useTheme();
  const initialSate = {
    autoFocus: true,
    index: 0,
    key: v4(),
    tooltip: false,
    tooltipIcon: true,
    type: 'paragraph',
    value: '',
  };
  const [content, setContent] = useState<any>([]);
  const [title, setTitle] = useState<string>('');
  const [hashtags, setHashTags] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<any>('');
  const [imageToUpload, setImageToUpload] = useState<string | Blob>('');

  const [state, setState] = React.useState<any>({
    currentImgIndex: null,
    inputsList: content !== '' ? content : [],
    previousKey: null,
    selectedPosition: {
      left: 0,
      top: 0,
    },
    urlValue: '',
    openContextLink: false,
    errors_urlValue: false,
    errors: {},
    showEmojiPicker: false,
    index: '',
    nameLink: '',
    contentArticleCreated: articleCreated,
  });
  const [createDraft, {isSuccess: isArticleCreated}] = useCreateArticleDraftMutation();
  const [updateDraft, { isLoading }] = useUpdateDraftArticleMutation();
  const [publishArticle, { isLoading: publishLoading }] =
    usePublishArticleMutation();
  const [getDraftDetail] = useLazyGetDraftDetailQuery();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const createArticleData = (
    title: string,
    content: any,
    file: any,
    syncHashTag: string
  ) => {
    const articleTags = syncHashTag.split(',');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', JSON.stringify(content));
    formData.append('coverPhoto', file);
    for (var i = 0; i < articleTags.length; i++) {
      formData.append('articleTags[]', articleTags[i]);
    }
    return formData;
  };

  const getArticleRequestData = () => {
    const tempAray: any = [];
    if (content && content.length > 0) {
      content.forEach((element: any) => tempAray.push(element));
    }
    setSyncState({
      syncContent: JSON.stringify(content),
      syncTitle: title,
      syncCoverPhoto: imageToUpload,
      syncHashTag: JSON.stringify(hashtags),
    });
  };

  const createDraftArticle = async (
    title: string,
    content: any,
    file: any,
    hashtags: string
  ) => {
    setArticleCreated(true);
    const formData = createArticleData(title, content, file, hashtags);
    const createdDraftData = await createDraft(formData);
    setArticleId((createdDraftData as any)?.data?.id);
    articleCreatedRef.current = true;
    setIsDisabled(false);
    getArticleRequestData();
  };

  const handleTitleChange = (event: any, articleCreated: boolean) => {
    const { value } = event.target;
    setTitle(value);
    if (!articleCreated) {
      createDraftArticle(value, content, imageToUpload, hashtags.join(','));
    }
  };

  const handleContentChange = useCallback((title: string, content: any) => {
    if (!articleCreatedRef.current) {
      createDraftArticle(title, content, imageToUpload, hashtags.join(','));
    }
    setContent(content);
  },[createDraftArticle,imageToUpload, hashtags,setContent, articleCreatedRef ]);

  const handleFileUpload = e => {
    e.preventDefault();
    if (e.target.files.length) {
      const reader = new FileReader();
      const img = e.target.files[0];
      reader.readAsDataURL(img);
      reader.onloadend = () => {
        setImageToUpload(img);
        setImagePreview(reader.result || '');
        if (!articleCreated) {
          createDraftArticle(title, content, img, hashtags.join(','));
        }
      };
    }
  };

  const validatePublishButton = (title: string, content: any) => {
    let contentLength = 0;
    content.forEach(element => {
      if (element.type === 'paragraph') {
        const plainText = element.value.replace(/(<([^>]+)>)/gi, '');
        contentLength += plainText.length;
      }
    });
    if (title.trim() === '') {
      toast.error(t("comp.addArticleForm.error1"));
      return false;
    }
    if (!(contentLength >= 1000)) {
      toast.error((t("comp.addArticleForm.error2",{contentLength})));
      return false;
    }
    return true;
  };

  const resetAllState = () => {
    setContent([]);
    setResetAll(true);
    setTitle('');
    setHashTags([]);
    setImagePreview('');
    setImageToUpload('');
    setArticleCreated(false);
    setIsPublish(false);
    setIsDisabled(false);
    setIsPublished(false);
    setSaveDraft(false);
    setState({
      currentImgIndex: null,
      inputsList: [initialSate],
      previousKey: null,
      selectedPosition: {
        left: 0,
        top: 0,
      },
      urlValue: '',
      openContextLink: false,
      errors_urlValue: false,
      errors: {},
      showEmojiPicker: false,
      index: '',
      nameLink: '',
      contentArticleCreated: articleCreated,
    });
  };

  const handleSubmit = async () => {
    if (validatePublishButton(title, content)) {
      const payload = createArticleData(
        title,
        content,
        imageToUpload,
        hashtags ? hashtags.join(',') : ''
      );
      await updateDraft({ articleId, payload });
      const response = await publishArticle({
        articleId,
        articleTags: hashtags,
      });
      if ((response as any)?.error) {
        setIsPublish(false);
      } else {
        const dynamicUrl = `/article/${(response as any)?.data?.publicUrl}`;
        if(isEditing){
          revalidateArticleDetail(dynamicUrl);
        }
        resetAllState();
       
        setIsPublish(false);
        router.push(dynamicUrl);
      }
    } else {
      setIsPublish(false);
    }
  };

  const updateDraftArticle = async forceUpdate => {
    const { syncContent, syncTitle, syncCoverPhoto, syncHashTag } = syncState;
    if (
      (articleId && (title || content) && syncHashTag !== hashtags) ||
      JSON.stringify(content) !== syncContent ||
      title !== syncTitle ||
      imageToUpload !== syncCoverPhoto ||
      forceUpdate
    ) {
      const payload = createArticleData(
        title,
        content,
        imageToUpload,
        hashtags ? hashtags.join(',') : ''
      );
      getArticleRequestData();
      await updateDraft({ articleId, payload });
      setSaveDraft(false);
      if (forceUpdate) {
        setIsDisabled(false);
        toast.success(t("comp.addArticleForm.successMsg"));
      }
    }
  };
  const getArticleDetail = async () => {
    const response = await getDraftDetail(articleId);
    if (response.data) {
      let responseContent = JSON.parse(response?.data?.content);
      responseContent = Array.isArray(responseContent)
        ? responseContent
        : [initialSate];
      responseContent =
        responseContent.length === 0 ? [initialSate] : responseContent;
      setTitle(response.data?.title ||'');
      setContent(JSON.parse(response?.data?.content));
      setState(prev => ({
        ...prev,
        inputsList: responseContent,
      }));
      setImagePreview(response?.data?.coverPhotoPath || '');
      setImageToUpload(response?.data?.coverPhotoPath || '');
      setIsPublished(response?.data?.isPublished);
      setStartAutoSave(true);
      setIsDisabled(false);
      setArticleCreated(true);
      articleCreatedRef.current = true;
    }
  };

  useEffect(() => {
    const sub = setInterval(() => {
      if (startAutoSave) updateDraftArticle(false);
    }, 15000);

    return () => {
      clearInterval(sub);
    };
  }, [startAutoSave]);

  useEffect(() => {
    if (saveDraft && !isLoading) {
      updateDraftArticle(true);
    } else if (isPublish && !publishLoading) {
      handleSubmit();
    }
  }, [
    isPublish,
    saveDraft,
    articleId,
    syncState,
    title,
    content,
    imageToUpload,
  ]);

  useEffect(() => {
    if (isEditing) {
      getArticleDetail();
    }
  }, [isEditing, articleId]);

  useEffect(() => {
    if (isReset) {
      resetAllState();
    }
  }, [isReset]);

  const onSelectTags = useCallback(
    tags => {
      setHashTags(tags);
    },
    [setHashTags]
  );


  return (
    <AddArticleFormBox>
      <Textarea
      translate="no"
        placeholder={t("comp.addArticleForm.title")}
        maxRows={2}
        value={title}
        maxLength={200}
        onChange={e => handleTitleChange(e, articleCreated)}
      />
      {title.length > 0 && (
        <Typography textAlign={'right'}> {`${title.length}/200`} </Typography>
      )}
      <FormControl>
        <FormLabel translate="no" sx={{ color: palette.primary[300] }}>{t("comp.addArticleForm.addTags")}</FormLabel>
        <TagAutocomplete
          onSelectTags={onSelectTags}
          maxSelectedTag={5}
          resetAll={resetAll}
        />
      </FormControl>
      <Stack
        mb={2}
        border={`2px dashed ${palette.action.border}`}
        borderRadius={2}
      >
        {imagePreview && (
          <Grid
            item
            sx={{
              position: 'relative'
            }}
          >
            <IconButton
               aria-label='delete image'
               style={{
                position: 'absolute',
                top: 10,
                right: 0,
                color: '#aaa'
              }}
              onClick={() => setImagePreview("")}
            >
              <CancelIcon />
            </IconButton>
          <Image
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }} // optional
            src={imagePreview}
            alt="thumbnail"
          />
          </Grid>
        )}
        {imagePreview === '' && (
          <>
            <input
              className="file-imput"
              type="file"
              onChange={handleFileUpload}
              ref={fileInputRef}
              style={{ display: 'none',cursor: "pointer" }}
              accept="image/x-png,image/gif,image/jpeg"
            />
            <Stack
              onClick={handleButtonClick}
              direction={'row'}
              gap={1}
              justifyContent={'center'}
              padding={2}
              sx={{ backgroundColor: palette.primary[400] }}
            >
              <ImageIcon
                color={
                  palette?.mode === 'light'
                    ? palette.text.primary
                    : palette?.action?.svg
                }
              />
              <Typography translate="no" style={{ cursor: "pointer" }} className="photoImage" variant="subtitle2">
                {t("comp.addArticleForm.coverPic")}
              </Typography>
            </Stack>
          </>
        )}
      </Stack>
      <ArticleItems
        articleCreated={articleCreatedRef}
        handleContentChange={handleContentChange}
        state={state}
        setState={setState}
      
      />
    </AddArticleFormBox>
  );
}

export default  React.memo(AddArticleForm);
