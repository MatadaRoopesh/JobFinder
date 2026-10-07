package com.roopesh.jobfinder.service;

import com.fasterxml.jackson.databind.JsonNode; import com.fasterxml.jackson.databind.ObjectMapper; import org.springframework.beans.factory.annotation.Value; import org.springframework.http.*; import org.springframework.stereotype.Service; import org.springframework.web.client.RestClient; import java.util.*;

@Service public class JobApiService {
 private final RestClient client; private final ObjectMapper mapper=new ObjectMapper();
 public JobApiService(@Value("${job.api.base-url}") String baseUrl){client=RestClient.builder().baseUrl(baseUrl).build();}
 public Map<String,Object> search(String q,String country,String seniority,String employmentType,int page){try{
   String path="/jobs/api/search"; var b=client.get().uri(u->{var x=u.path(path).queryParam("q",q==null?"":q).queryParam("page",Math.max(page,1));if(country!=null&&!country.isBlank())x.queryParam("country",country);if(seniority!=null&&!seniority.isBlank())x.queryParam("seniority",seniority);if(employmentType!=null&&!employmentType.isBlank())x.queryParam("employment_type",employmentType);x.queryParam("sort","recent");return x.build();}).accept(MediaType.APPLICATION_JSON).retrieve().body(String.class);
   JsonNode root=mapper.readTree(b); List<Map<String,Object>> jobs=new ArrayList<>(); JsonNode arr=root.path("jobs"); if(!arr.isArray())arr=root.path("results"); for(JsonNode j:arr){Map<String,Object> m=new LinkedHashMap<>();m.put("id",text(j,"guid",text(j,"id","")));m.put("title",text(j,"title","Untitled role"));m.put("company",text(j,"companyName","Unknown company"));m.put("location",location(j));m.put("applicationLink",text(j,"applicationLink",""));m.put("description",text(j,"description",text(j,"excerpt","")));m.put("seniority",arrayText(j,"seniority",""));m.put("employmentType",text(j,"employmentType",""));jobs.add(m);}
   Map<String,Object> out=new LinkedHashMap<>();out.put("totalCount",root.path("totalCount").asInt(jobs.size()));out.put("page",page);out.put("jobs",jobs);return out;
 }catch(Exception e){throw new IllegalStateException("Unable to fetch jobs from external API",e);}}
 private String location(JsonNode j){JsonNode a=j.path("locationRestrictions");if(a.isArray()&&!a.isEmpty()){List<String> names=new ArrayList<>();for(JsonNode x:a){String n=text(x,"name","");if(!n.isBlank())names.add(n);}if(!names.isEmpty())return String.join(", ",names);}return "Worldwide / Remote";}
 private String arrayText(JsonNode j,String field,String def){JsonNode a=j.path(field);if(a.isArray()&&!a.isEmpty())return a.get(0).asText();return text(j,field,def);}
 private String text(JsonNode n,String field,String def){JsonNode v=n.get(field);return v!=null&&!v.isNull()&&!v.asText().isBlank()?v.asText():def;}
}
