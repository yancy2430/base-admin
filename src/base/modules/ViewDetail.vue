<template>
  <div>
    <a-row>
      <a-col :span="12">
        <description-item title="Full Name" content="Lily" />
      </a-col>
      <a-col :span="12">
        <description-item title="Account" content="AntDesign@example.com" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12">
        <description-item title="City" content="HangZhou" />
      </a-col>
      <a-col :span="12">
        <description-item title="Country" content="China🇨🇳" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12">
        <description-item title="Birthday" content="February 2,1900" />
      </a-col>
      <a-col :span="12">
        <description-item title="Website" content="-" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <description-item
          title="Skills"
          content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
        />
      </a-col>
    </a-row>
  </div>
</template>
<script>
  import descriptionItem from './DescriptionItem';

  export default {
    name:"BaseTable",
    components: {
      descriptionItem,
    },
    props:{
      data:Object
    },
    data() {
      return {
        visible: false,
        pStyle: {
          fontSize: '16px',
          color: 'rgba(0,0,0,0.85)',
          lineHeight: '24px',
          display: 'block',
          marginBottom: '16px',
        },
        pStyle2: {
          marginBottom: '24px',
        },
      };
    },
    methods: {
      showDrawer() {
        this.visible = true;
      },
      onClose() {
        this.visible = false;
      },
    },
  };
</script>