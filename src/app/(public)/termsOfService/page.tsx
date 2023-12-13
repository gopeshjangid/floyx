import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getMetaData } from '@/lib/SEO';

export default function TermsOfService() {
  const color = 'textSecondary';
  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h4" color={color} gutterBottom component="div">
        Floyx Terms of Service
      </Typography>

      <Typography
        my={2}
        variant="h6"
        color={color}
        gutterBottom
        component="div"
      >
        General Terms
      </Typography>

      <Typography variant="subtitle2" color={color}>
        This agreement (‘Agreement’) between you (‘you’, ‘customer’) and Floyx
        LLC. located in 16192 Coastal Highway, Lewes, Delaware 19958, County of
        Sussex, registered by the Delaware Registered as a Limited Liability
        Company under Companies Act, 1961, registration number 6099676 (‘we’,
        ‘us’, ‘administrator’) sets out your rights to access and use of Floyx
        Platform and any other services that are or may be provided by us
        (‘Service’). Continuous use of the Service is considered as an
        acceptance of the Agreement. If you are using the Services on behalf of
        a company, organization or any other legal entity, you represent and
        warrant that You are authorized to do so and have the authority to bind
        such entity to this Agreement.
      </Typography>

      <Typography
        my={2}
        variant="h6"
        color={color}
        gutterBottom
        component="div"
      >
        Privacy Policy
      </Typography>

      <Typography variant="subtitle2" color={color}>
        Information about how we collect, used and disclose information gained
        about you through continuous use of our Service may be found in Privacy
        Policy.
      </Typography>

      <Typography
        my={2}
        color={color}
        variant="h6"
        gutterBottom
        component="div"
      >
        Eligibility
      </Typography>

      <Typography color={color} variant="subtitle2" gutterBottom>
        The Service is not targeted toward, nor intended for use by, anyone
        under the age of 13. You must be at least 13 years of age to access or
        use of the Service. If you are between 13 and 18 years of age (or the
        age of legal majority where you reside), you may only access or use the
        Service under the supervision of a parent or legal guardian who agrees
        to be bound by this Agreement.
      </Typography>
      <Typography color={color} variant="subtitle2" gutterBottom>
        Copyright and Limited License We may retain data, text, photographs,
        images, video, audio, graphics, articles, comments, software, code,
        scripts, and other content supplied by us. Our content is protected by
        intellectual property laws, including copyright and other proprietary
        rights of the Republic of USA, European Union and other foreign
        countries. Except as explicitly stated in this Agreement, we do not
        grant any express or implied rights to usage of our content.
      </Typography>

      <Typography color={color} variant="subtitle2">
        You are granted a limited, non-exclusive, non-transferable, and
        non-sublicensable license to access and use the Service and our content
        for your personal use. You retain ownership of and responsibility for
        content you create or own. If you&apos;re posting anything you did not
        create yourself or do not own the rights to, you agree that you are
        responsible for any content you post; that you will only submit content
        that you have the right to post; and that you will fully comply with any
        third-party licenses relating to content you post
      </Typography>

      <Typography my={2} color={color} variant="h6" gutterBottom>
        Trademark Policy
      </Typography>
      <Typography color={color} variant="subtitle2">
        “Floyx”, the Floyx logo and any other product or service names, logos,
        slogans that may appear on the Service are trademarks of Floyx LLC.,
        and, may not be copied, imitated, or used, in whole or in part, unless
        explicitly permitted or without first receiving written permission from
        us to do so. The look and feel of the Service is protected by copyright.
        You may not duplicate, copy, or reuse any portion of the HTML/CSS,
        Javascript, or visual design elements or concepts without express
        written permission.
      </Typography>
    </Box>
  );
}

export const metadata = getMetaData({
  title: 'Floyx | Decentralized World',
  description: 'Floyx | Decentralized World',
});
